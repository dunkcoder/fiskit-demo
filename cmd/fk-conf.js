var util = fiskit.util,
    root = fiskit.project.getProjectPath();

// 各种配置及开关
var config = {
    // 静态资源版本号
    version: '1.0.0',
    // 合并开关
    packed: true,
    // cdn域名开关，prod环境始终为true
    cdn: false,
    // cdn域名地址
    cdnUrl: '//static.360buyimg.com/newbie/yiyebs',
    // MD5后缀开关
    useHash: false,
    velocity: {
        loader: 'seajs.use',
        macro: '/macro.vm',
        root: [root, root + '/page']
    },
    // release dev的目标路径
    devPath: 'd:\\www\\fiskit_test_cmd',
    // 模块化配置
    modules: {
        mode: 'cmd',
        forwardDeclaration: true,
        baseUrl: '/'
    }
};

fiskit.amount(config);

fiskit
    .match('/page/_scripts.html', { release: false })
    .match('/static/common/lib/**.js', {
        isMod: true
    });

// 合并设置
config.packed && fiskit
    .match('/widget/**.{css,scss}', {
        packTo: '/widget/widget_pkg.css'
    });

// 替换模板cdn前缀
fiskit
    .media('vm')
    .match('*.vm', {
        deploy: [
            fiskit.plugin('replace', {
                from: config.cdnUrl + '/' + config.version,
                to: '$!{staticDomain}'
            }),
            fiskit.plugin('local-deliver', {
                to: './output/template/' + config.version
            })
        ]
    })