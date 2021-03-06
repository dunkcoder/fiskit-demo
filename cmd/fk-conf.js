var util = fiskit.util,
    root = fiskit.project.getProjectPath();

// 各种配置及开关
var config = {
    // 静态资源版本号
    version: '1.0.0',
    // 合并开关
    packed: false,
    // cdn域名开关，prod环境始终为true
    cdn: false,
    // cdn域名地址
    cdnUrl: '//static.360buyimg.com/newbie/yiyebs',
    // MD5后缀开关
    useHash: false,
    velocity: {
        loader: 'seajs',
        loadSync: true,
        macro: '/macro.vm',
        root: [root, root + '/page']
    },
    // release dev的目标路径
    //devPath: 'd:\\www\\fiskit_test_cmd',
    replace: false,
    // 模块化配置
    modules: {
        mode: 'cmd',
        forwardDeclaration: true,
        baseUrl: '/'
    },
    // 打包设置
    package: {
        '/widget/**.{css,scss}': {
            packTo: '/widget/widget_pkg.css'
        },
        '/widget/**.js': {
            packTo: '/widget/widget_pkg.js'
        }
    }
};

fiskit.amount(util.merge(config, {
    replace: {
        from: config.cdnUrl + '/' + config.version,
        to: '$!{staticDomain}'
    }
}));

fiskit
    .match('/static/common/lib/**.js', {
        isMod: true
    });