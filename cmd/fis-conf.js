// 各种配置及开关
var config = {
    // 静态资源版本号
    version: '1.0.0',
    // 合并开关
    packed: false,
    // cdn域名开关，prod环境始终为true
    cdn: false,
    // cdn域名地址
    cdnUrl: 'http://static.360buyimg.com/yiye',
    // MD5后缀开关
    useHask: false,
    velocity: {
        loader: 'seajs.use',
        macro: '/page/macro.vm'
    },
    // 模块化配置
    modules: {
        mode: 'cmd',
        forwardDeclaration: true,
        baseUrl: '/'
    }
};

fis.config.get('initConfig')(config);

// 合并设置
config.packed && fis
    .match('/static/lib/**', {
        packTo: '/static/lib/lib_pkg.js'
    })
    .match('/static/components/**', {
        packTo: '/static/components/components_pkg.js'
    })
    .match('/widget/**.{css,scss}', {
        packTo: '/widget/widget_pkg.css'
    });

fis.media('dev').match('*', {
    deploy: fis.plugin('local-deliver', {
        to: 'd:\\www\\fiskit_test'
    })
});