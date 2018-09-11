import OfflinePluginRuntime from 'offline-plugin/runtime';

const onUpdateReady = () => {
  console.log('SW Event: 准备更新');
  OfflinePluginRuntime.applyUpdate();
};

const onUpdating = () => {
  console.log('SW Event: 开始更新');
};

const onUpdated = () => {
  console.log('SW Event: 更新成功');
  // window.location.reload();
};

const onUpdateFailed = () => {
  console.log('SW Event: 更新失败');
};

/**
 * 注册 offline plugin
 */
const registerRuntime = () => {
  OfflinePluginRuntime.install({
    onUpdateReady,
    onUpdating,
    onUpdated,
    onUpdateFailed,
  });
};

/**
 * 注销sw && 清除缓存
 */
const unregisterServiceWorker = () => {
  navigator.serviceWorker.getRegistration().then((registration) => {
    registration && registration.unregister().then((boolean) => {
      if (boolean) {
        caches && caches.keys && caches.keys().then((keys) => {
          keys.forEach((key) => {
            caches.delete(key); // 清除缓存
          });
        });
        console.log('注销成功');
      } else {
        console.log('注销失败');
      }
    }).catch((err) => {
      console.log('注销失败', err);
      throw err;
    });
  });
};

export default {
  registerRuntime,
  unregisterServiceWorker,
};
