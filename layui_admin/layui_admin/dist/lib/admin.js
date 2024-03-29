/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */ ;
layui.define("view", function(e) {
    var a = layui.jquery,
        i = layui.laytpl,
        t = layui.element,
        n = layui.setter,
        l = layui.view,
        s = layui.device(),
        r = a(window),
        o = a("body"),
        u = a("#" + n.container),
        c = "layui-show",
        d = "layui-this",
        y = "layui-disabled",
        m = "#LAY_app_body",
        h = "LAY_app_flexible",
        f = "layadmin-side-spread-sm",
        p = "layadmin-tabsbody-item",
        v = "layui-icon-shrink-right",
        b = "layui-icon-spread-left",
        g = "layadmin-side-shrink",
        C = "LAY-system-side-menu",
        x = {
            v: "1.0.0 pro",
            req: l.req,
            sendAuthCode: function(e) {
                e = a.extend({
                    seconds: 60,
                    elemPhone: "#LAY_phone",
                    elemVercode: "#LAY_vercode"
                }, e);
                var i, t = e.seconds,
                    n = function(l) {
                        var s = a(e.elem);
                        t--, t < 0 ? (s.removeClass(y).html("获取验证码"), t = e.seconds, clearInterval(i)) : s.addClass(y).html(t + "秒后重获"), l || (i = setInterval(function() {
                            n(!0)
                        }, 1e3))
                    };
                o.on("click", e.elem, function() {
                    e.elemPhone = a(e.elemPhone), e.elemVercode = a(e.elemVercode);
                    var i = e.elemPhone,
                        l = i.val();
                    if (t === e.seconds && !a(this).hasClass(y)) {
                        if (!/^1\d{10}$/.test(l)) return i.focus(), layer.msg("请输入正确的手机号");
                        if ("object" == typeof e.ajax) {
                            var s = e.ajax.success;
                            delete e.ajax.success
                        }
                        x.req(a.extend(!0, {
                            url: "/auth/code",
                            type: "get",
                            data: {
                                phone: l
                            },
                            success: function(a) {
                                layer.msg("验证码已发送至你的手机，请注意查收", {
                                    icon: 1,
                                    shade: 0
                                }), e.elemVercode.focus(), n(), s && s(a)
                            }
                        }, e.ajax))
                    }
                })
            },
            screen: function() {
                var e = r.width();
                return e >= 1200 ? 3 : e >= 992 ? 2 : e >= 768 ? 1 : 0
            },
            exit: l.exit,
            sideFlexible: function(e) {
                var i = u,
                    t = a("#" + h),
                    l = x.screen();
                "spread" === e ? (t.removeClass(b).addClass(v), l < 2 ? i.addClass(f) : i.removeClass(f), i.removeClass(g)) : (t.removeClass(v).addClass(b), l < 2 ? i.removeClass(g) : i.addClass(g), i.removeClass(f)), layui.event.call(this, n.MOD_NAME, "side({*})", {
                    status: e
                })
            },
            escape: function(e) {
                return String(e || "").replace(/&(?!#?[a-zA-Z0-9]+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;")
            },
            on: function(e, a) {
                return layui.onevent.call(this, n.MOD_NAME, e, a)
            },
            popup: l.popup,
            popupRight: function(e) {
                return x.popup.index = layer.open(a.extend({
                    type: 1,
                    id: "LAY_adminPopupR",
                    anim: -1,
                    title: !1,
                    closeBtn: !1,
                    offset: "r",
                    shade: .1,
                    shadeClose: !0,
                    skin: "layui-anim layui-anim-rl layui-layer-adminRight",
                    area: "300px"
                }, e))
            },
            theme: function(e) {
                var t = (n.theme, layui.data(n.tableName)),
                    l = "LAY_layadmin_theme",
                    s = document.createElement("style"),
                    r = i([".layui-side-menu,", ".layadmin-pagetabs .layui-tab-title li:after,", ".layadmin-pagetabs .layui-tab-title li.layui-this:after,", ".layui-layer-admin .layui-layer-title,", ".layadmin-side-shrink .layui-side-menu .layui-nav>.layui-nav-item>.layui-nav-child", "{background-color:{{d.color.main}} !important;}", ".layui-nav-tree .layui-this,", ".layui-nav-tree .layui-this>a,", ".layui-nav-tree .layui-nav-child dd.layui-this,", ".layui-nav-tree .layui-nav-child dd.layui-this a", "{background-color:{{d.color.selected}} !important;}", ".layui-layout-admin .layui-logo{background-color:{{d.color.logo || d.color.main}} !important;}", "{{# if(d.color.header){ }}", ".layui-layout-admin .layui-header{background-color:{{ d.color.header }};}", ".layui-layout-admin .layui-header a,", ".layui-layout-admin .layui-header a cite{color: #f8f8f8;}", ".layui-layout-admin .layui-header a:hover{color: #fff;}", ".layui-layout-admin .layui-header .layui-nav .layui-nav-more{border-top-color: #fbfbfb;}", ".layui-layout-admin .layui-header .layui-nav .layui-nav-mored{border-color: transparent; border-bottom-color: #fbfbfb;}", ".layui-layout-admin .layui-header .layui-nav .layui-this:after, .layui-layout-admin .layui-header .layui-nav-bar{background-color: #fff; background-color: rgba(255,255,255,.5);}", ".layadmin-pagetabs .layui-tab-title li:after{display: none;}", "{{# } }}"].join("")).render(e = a.extend({}, t.theme, e)),
                    u = document.getElementById(l);
                "styleSheet" in s ? (s.setAttribute("type", "text/css"), s.styleSheet.cssText = r) : s.innerHTML = r, s.id = l, u && o[0].removeChild(u), o[0].appendChild(s), o.attr("layadmin-themealias", e.color.alias), t.theme = t.theme || {}, layui.each(e, function(e, a) {
                    t.theme[e] = a
                }), layui.data(n.tableName, {
                    key: "theme",
                    value: t.theme
                })
            },
            initTheme: function(e) {
                var a = n.theme;
                e = e || 0, a.color[e] && (a.color[e].index = e, x.theme({
                    color: a.color[e]
                }))
            },
            tabsPage: {},
            tabsBody: function(e) {
                return a(m).find("." + p).eq(e || 0)
            },
            tabsBodyChange: function(e) {
                x.tabsBody(e).addClass(c).siblings().removeClass(c), k.rollPage("auto", e)
            },
            resize: function(e) {
                var a = layui.router(),
                    i = a.path.join("-");
                r.off("resize", x.resizeFn[i]), e(), x.resizeFn[i] = e, r.on("resize", x.resizeFn[i])
            },
            resizeFn: {},
            runResize: function() {
                var e = layui.router(),
                    a = e.path.join("-");
                x.resizeFn[a] && x.resizeFn[a]()
            },
            delResize: function() {
                var e = layui.router(),
                    a = e.path.join("-");
                r.off("resize", x.resizeFn[a]), delete x.resizeFn[a]
            },
            correctRouter: function(e) {
                /^\//.test(e) || (e = "/" + e);
                return e.replace(/^(\/+)/, "/").replace(new RegExp("/" + n.entry + "$"), "/");
            },
            closeThisTabs: function() {
                x.tabsPage.index && a(z).eq(x.tabsPage.index).find(".layui-tab-close").trigger("click")
            }
        },
        k = x.events = {
            flexible: function(e) {
                var a = e.find("#" + h),
                    i = a.hasClass(b);
                x.sideFlexible(i ? "spread" : null)
            },
            refresh: function() {
                layui.index.render()
            },
            serach: function(e) {
                e.off("keypress").on("keypress", function(a) {
                    if (this.value.replace(/\s/g, "") && 13 === a.keyCode) {
                        var i = e.attr("lay-action"),
                            t = e.attr("lay-text") || "搜索";
                        i += this.value, t = t + ' <span style="color: #FF5722;">' + x.escape(this.value) + "</span>", location.hash = x.correctRouter(i), k.serach.keys || (k.serach.keys = {}), k.serach.keys[x.tabsPage.index] = this.value, this.value === k.serach.keys[x.tabsPage.index] && k.refresh(e), this.value = ""
                    }
                })
            },
            message: function(e) {
                e.find(".layui-badge-dot").remove()
            },
            theme: function() {
                x.popupRight({
                    id: "LAY_adminPopupTheme",
                    success: function() {
                        l(this.id).render("system/theme")
                    }
                })
            },
            note: function(e) {
                var a = x.screen() < 2,
                    i = layui.data(n.tableName).note;
                k.note.index = x.popup({
                    title: "便签",
                    shade: 0,
                    offset: ["41px", a ? null : e.offset().left - 250 + "px"],
                    anim: -1,
                    id: "LAY_adminNote",
                    skin: "layadmin-note layui-anim layui-anim-upbit",
                    content: '<textarea placeholder="内容"></textarea>',
                    resize: !1,
                    success: function(e, a) {
                        var t = e.find("textarea"),
                            l = void 0 === i ? "便签中的内容会存储在本地，这样即便你关掉了浏览器，在下次打开时，依然会读取到上一次的记录。是个非常小巧实用的本地备忘录" : i;
                        t.val(l).focus().on("keyup", function() {
                            layui.data(n.tableName, {
                                key: "note",
                                value: this.value
                            })
                        })
                    }
                })
            },
            fullscreen: function(e) {
                var a = "layui-icon-screen-full",
                    i = "layui-icon-screen-restore",
                    t = e.children("i");
                if (t.hasClass(a)) {
                    var n = document.body;
                    n.webkitRequestFullScreen ? n.webkitRequestFullScreen() : n.mozRequestFullScreen ? n.mozRequestFullScreen() : n.requestFullScreen && n.requestFullscreen(), t.addClass(i).removeClass(a)
                } else {
                    var n = document;
                    n.webkitCancelFullScreen ? n.webkitCancelFullScreen() : n.mozCancelFullScreen ? n.mozCancelFullScreen() : n.cancelFullScreen ? n.cancelFullScreen() : n.exitFullscreen && n.exitFullscreen(), t.addClass(a).removeClass(i)
                }
            },
            about: function() {
                x.popupRight({
                    id: "LAY_adminPopupAbout",
                    success: function() {
                        l(this.id).render("system/about")
                    }
                })
            },
            more: function() {
                x.popupRight({
                    id: "LAY_adminPopupMore",
                    success: function() {
                        l(this.id).render("system/more")
                    }
                })
            },
            back: function() {
                history.back()
            },
            setTheme: function(e) {
                var a = e.data("index");
                e.siblings(".layui-this").data("index");
                e.hasClass(d) || (e.addClass(d).siblings(".layui-this").removeClass(d), x.initTheme(a))
            },
            rollPage: function(e, i) {
                var t = a("#LAY_app_tabsheader"),
                    n = t.children("li"),
                    l = (t.prop("scrollWidth"), t.outerWidth()),
                    s = parseFloat(t.css("left"));
                if ("left" === e) {
                    if (!s && s <= 0) return;
                    var r = -s - l;
                    n.each(function(e, i) {
                        var n = a(i),
                            l = n.position().left;
                        if (l >= r) return t.css("left", -l), !1
                    })
                } else "auto" === e ? ! function() {
                        var e, r = n.eq(i);
                        if (r[0]) {
                            if (e = r.position().left, e < -s) return t.css("left", -e);
                            if (e + r.outerWidth() >= l - s) {
                                var o = e + r.outerWidth() - (l - s);
                                n.each(function(e, i) {
                                    var n = a(i),
                                        l = n.position().left;
                                    if (l + s > 0 && l - s > o) return t.css("left", -l), !1
                                })
                            }
                        }
                    }() : n.each(function(e, i) {
                        var n = a(i),
                            r = n.position().left;
                        if (r + n.outerWidth() >= l - s) return t.css("left", -r), !1
                    })
            },
            leftPage: function() {
                k.rollPage("left")
            },
            rightPage: function() {
                k.rollPage()
            },
            closeThisTabs: function() {
                x.closeThisTabs()
            },
            closeOtherTabs: function(e) {
                var i = "LAY-system-pagetabs-remove";
                "all" === e ? (a(z + ":gt(0)").remove(), a(m).find("." + p + ":gt(0)").remove()) : (a(z).each(function(e, t) {
                        e && e != x.tabsPage.index && (a(t).addClass(i), x.tabsBody(e).addClass(i))
                    }), a("." + i).remove())
            },
            closeAllTabs: function() {
                k.closeOtherTabs("all"), location.hash = ""
            },
            shade: function() {
                x.sideFlexible()
            }
        };
    ! function() {
        var e = layui.data(n.tableName);
        e.theme ? x.theme(e.theme) : n.theme && x.initTheme(n.theme.initColorIndex), o.addClass("layui-layout-body"), x.screen() < 1 && delete n.pageTabs, n.pageTabs || u.addClass("layadmin-tabspage-none"), s.ie && s.ie < 10 && l.error("IE" + s.ie + "下访问可能不佳，推荐使用：Chrome / Firefox / Edge 等高级浏览器", {
            offset: "auto",
            id: "LAY_errorIE"
        })
    }(), x.on("hash(side)", function(e) {
        var i = e.path,
            t = function(e) {
                return {
                    list: e.children(".layui-nav-child"),
                    name: e.data("name"),
                    jump: e.data("jump")
                }
            },
            n = a("#" + C),
            l = "layui-nav-itemed",
            s = function(e) {
                var n = x.correctRouter(i.join("/"));
                e.each(function(e, s) {
                    var r = a(s),
                        o = t(r),
                        u = o.list.children("dd"),
                        c = i[0] == o.name || 0 === e && !i[0] || o.jump && n == x.correctRouter(o.jump);
                    if (u.each(function(e, s) {
                            var r = a(s),
                                u = t(r),
                                c = u.list.children("dd"),
                                y = i[0] == o.name && i[1] == u.name || u.jump && n == x.correctRouter(u.jump);
                            if (c.each(function(e, s) {
                                    var r = a(s),
                                        c = t(r),
                                        y = i[0] == o.name && i[1] == u.name && i[2] == c.name || c.jump && n == x.correctRouter(c.jump);
                                    if (y) {
                                        var m = c.list[0] ? l : d;
                                        return r.addClass(m).siblings().removeClass(m), !1
                                    }
                                }), y) {
                                var m = u.list[0] ? l : d;
                                return r.addClass(m).siblings().removeClass(m), !1
                            }
                        }), c) {
                        var y = o.list[0] ? l : d;
                        return r.addClass(y).siblings().removeClass(y), !1
                    }
                })
            };
        n.find("." + d).removeClass(d), x.screen() < 2 && x.sideFlexible(), s(n.children("li"))
    }), t.on("nav(layadmin-system-side-menu)", function(e) {
        e.siblings(".layui-nav-child")[0] && u.hasClass(g) && (x.sideFlexible("spread"), layer.close(e.data("index"))), x.tabsPage.type = "nav"
    }), t.on("nav(layadmin-pagetabs-nav)", function(e) {
        var a = e.parent();
        a.removeClass(d), a.parent().removeClass(c)
    });
    var F = function(e) {
            var a = e.attr("lay-id"),
                i = e.attr("lay-attr"),
                t = e.index();
            x.tabsBodyChange(t), location.hash = a === n.entry ? "/" : i
        },
        z = "#LAY_app_tabsheader>li";
    o.on("click", z, function() {
        var e = a(this),
            i = e.index();
        return x.tabsPage.type = "tab", x.tabsPage.index = i, "iframe" === e.attr("lay-attr") ? x.tabsBodyChange(i) : (F(e), void x.runResize())
    }), t.on("tabDelete(layadmin-layout-tabs)", function(e) {
        var i = a(z + ".layui-this");
        e.index && x.tabsBody(e.index).remove(), F(i), x.delResize()
    }), o.on("click", "*[lay-href]", function() {
        var e = a(this),
            i = e.attr("lay-href");
        layui.router();
        x.tabsPage.elem = e, location.hash = x.correctRouter(i)
    }), o.on("click", "*[layadmin-event]", function() {
        var e = a(this),
            i = e.attr("layadmin-event");
        k[i] && k[i].call(this, e)
    }), o.on("mouseenter", "*[lay-tips]", function() {
        var e = a(this);
        if (!e.parent().hasClass("layui-nav-item") || u.hasClass(g)) {
            var i = e.attr("lay-tips"),
                t = e.attr("lay-offset"),
                n = e.attr("lay-direction"),
                l = layer.tips(i, this, {
                    tips: n || 1,
                    time: -1,
                    success: function(e, a) {
                        t && e.css("margin-left", t + "px")
                    }
                });
            e.data("index", l)
        }
    }).on("mouseleave", "*[lay-tips]", function() {
        layer.close(a(this).data("index"))
    });
    var P = layui.data.resizeSystem = function() {
        layer.closeAll("tips"), P.lock || setTimeout(function() {
            x.sideFlexible(x.screen() < 2 ? "" : "spread"), delete P.lock
        }, 100), P.lock = !0
    };
    r.on("resize", layui.data.resizeSystem), e("admin", x)
});