export function createDanmakuData(BDM) {
  const danmakuData = {
    arcMgr: new BDM.BiliArchive(),
    dmMgr: null,
    info: {},
    data: {},
    dmCount: 0,
    alignData: [],
    dmList: [],
    _buildDmListFromMgr() {
      const list = Object.values(danmakuData.dmMgr?.dmDict || {});
      danmakuData.data = { ...danmakuData.data, ...(danmakuData.dmMgr?.data || {}) };
      danmakuData.data.danmakuData = list;
      danmakuData.dmCount = list.length;
    },
    setData(data) {
      danmakuData.data = { ...(data || {}) };
      const info = danmakuData.arcMgr.setData(danmakuData.data);
      danmakuData.info = info || danmakuData.arcMgr.info || {};
      danmakuData.dmMgr = new BDM.BiliDanmaku(danmakuData.info);
      danmakuData.dmMgr.setData(danmakuData.data);
      danmakuData._buildDmListFromMgr();
    },
    async getData(url) {
      const info = await danmakuData.arcMgr.getData(url);
      danmakuData.info = info || danmakuData.arcMgr.info || {};
      danmakuData.data = { ...danmakuData.arcMgr.data };
      danmakuData.dmMgr = new BDM.BiliDanmaku(danmakuData.info);
    },
    async getDanmakuXml() {
      if (!danmakuData.dmMgr) danmakuData.dmMgr = new BDM.BiliDanmaku(danmakuData.info);
      danmakuData.dmMgr.setData(danmakuData.data);
      if (typeof danmakuData.dmMgr.getDmXml === 'function') {
        const before = Object.keys(danmakuData.dmMgr.dmDict || {}).length;
        await danmakuData.dmMgr.getDmXml();
        danmakuData._buildDmListFromMgr();
        return danmakuData.dmCount - before;
      }
      return 0;
    },
    async getDanmakuPb() {
      if (!danmakuData.dmMgr) danmakuData.dmMgr = new BDM.BiliDanmaku(danmakuData.info);
      danmakuData.dmMgr.setData(danmakuData.data);
      const before = Object.keys(danmakuData.dmMgr.dmDict || {}).length;
      await danmakuData.dmMgr.getDmPb();
      danmakuData._buildDmListFromMgr();
      return danmakuData.dmCount - before;
    },
    getDanmakuData() {
      danmakuData.applyAlignment();
      return danmakuData.dmList;
    },
    applyAlignment() {
      const danmakus = danmakuData.data.danmakuData;
      if (!danmakus?.length) return;
      const alignments = danmakuData.alignData.slice().sort((a, b) => (a.source?.start || 0) - (b.source?.start || 0));
      const newDanmakus = [];
      let lastSEnd = 0;
      let lastTEnd = 0;

      for (let i = 0; i <= alignments.length; i++) {
        const align = alignments[i];
        if (!align) continue;
        const { source, target, mode, comment } = align;
        const sStart = source.start;
        const sEnd = source.end;
        const tStart = target.start;
        const tEnd = target.end;
        const sDuration = sEnd - sStart;
        const tDuration = tEnd - tStart;

        for (const d of danmakus) {
          const time = d.progress;
          if (time >= lastSEnd && time < sStart) {
            const newTime = time - lastSEnd + lastTEnd;
            newDanmakus.push({ ...d, progress: Math.round(newTime) });
          } else if (time >= sStart && time < sEnd) {
            let newTime = null;
            if (mode === 'map') {
              const ratio = (time - sStart) / sDuration;
              newTime = tStart + ratio * tDuration;
            } else {
              newTime = time - sStart + tStart;
              if (newTime < tStart || newTime >= tEnd) continue;
            }
            newDanmakus.push({ ...d, progress: Math.round(newTime) });
          }
        }

        if (comment) {
          const commentId = Date.now() * 1000 + i;
          const markDuration = Math.max(0, Math.min(tEnd - tStart, 10000));
          newDanmakus.push({
            content: `${comment}`,
            progress: Math.round(tStart),
            type: 'mark',
            duration: markDuration,
            fontsize: 32,
            color: 0xffffff,
            ctime: Math.floor(Date.now() / 1000),
            pool: 0,
            midHash: 'system',
            id: commentId,
            idStr: String(commentId),
            weight: 10,
          });
        }

        lastSEnd = sEnd;
        lastTEnd = tEnd;
      }

      for (const d of danmakus) {
        const time = d.progress;
        if (time >= lastSEnd) {
          const newTime = time - lastSEnd + lastTEnd;
          newDanmakus.push({ ...d, progress: Math.round(newTime) });
        }
      }

      danmakuData.dmList = newDanmakus;
    },
  };

  return danmakuData;
}
