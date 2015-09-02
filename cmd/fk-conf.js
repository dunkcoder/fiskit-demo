var root = fiskit.project.getProjectPath();

// 各种配置及开关
var config = {
    // 静态资源版本号
    version: '1.0.0',
    // 合并开关
    packed: false,
    // cdn域名开关，prod环境始终为true
    cdn: false,
    // cdn域名地址
    cdnUrl: 'http://static.360buyimg.com/newbie/yiyebs',
    // MD5后缀开关
    useHash: false,
    velocity: {
        loader: 'seajs.use',
        macro: '/macro.vm',
        root: [root, root + '/page']
    },
    // 模块化配置
    modules: {
        mode: 'cmd',
        forwardDeclaration: true,
        baseUrl: '/'
    }
};

fiskit.amount(config);

fiskit.match('/static/common/lib/**.js', {
    isMod: true
});

// 合并设置
config.packed && fiskit
    .match('/widget/**.{css,scss}', {
        packTo: '/widget/widget_pkg.css'
    });

fiskit.media('dev').match('*', {
    deploy: fiskit.plugin('local-deliver', {
        to: 'd:\\www\\yiye_commerce'
    })
});

// 只发布VM文件
fiskit
    .media('tmpl')
    .match('*', {
        release: false
    })
    .match('*.vm', {
        parser: null,
        isHtmlLike: false,
        rExt: '.vm',
        deploy: fiskit.plugin('local-deliver', {
            to: './output/template/' + config.version
        }),
        postprocessor: [
            // 将.scss|.less引用替换为css
            function(content, file, settings) {
                var rLink = /<link[^>]*(?:\/)?>/ig;
                var rHref = /(href=("|')[^'"]+\.)(scss|less)/ig;
                return content.replace(rLink, function(match) {
                    return match.replace(rHref, function(match, p1, p2) {
                        return [p1, 'css'].join('');
                    });
                });
            },
            // 将以/开头的script, img, link引用添加$!{staticDomain}前缀
            function(content, file, settings) {
                var rTag = /(<script[^>]*>)|(<link[^>]*>)|(<img[^>]*>)/ig;
                var rSrcHref = /(\s(src|href)=('|"))(\/)([^\/]+)/ig;

                return content = content.replace(rTag, function(match) {
                    return match.replace(rSrcHref, function(match, p1, p2, p3, p4, p5) {
                        //console.log( [p1, p2, p3, p4, p5].join('      '));
                        return [p1, '$!{staticDomain}/', p5].join('');
                    });
                });
            }
        ]
    })
    .match('/page/(**.vm)', {
        release: '$1'
    })
    .match('/widget/**.vm', {
        release: '$0'
    })