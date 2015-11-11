var System = new function() {
    function h() {
        this.begin = function(b) {};
        this.end = function() {};
        this.wake = function() {};
        this.mouseWheel = this.mouseRelease = this.mousePress = this.mouseMove = this.keyRelease = this.keyPress = this.charTyped = function(b) {
            return !1
        };
        this.update = function(b) {
            return !1
        }
    }

    function g(b, d) {
        var a = this;
        2 <= arguments.length ? (a.x = b, a.y = d) : 1 == arguments.length ? (a.x = b.x, a.y = b.y) : a.x = a.y = 0;
        this.toString = function() {
            return "{x:" + a.x + ",y:" + a.y + "}"
        }
    }

    function k(b) {
        0 < arguments.length ? (this.pagePos = new g(b.pagePos), this.mousePos = new g(b.mousePos), this.mouseMov = new g(b.mouseMov), this.mouseWheel = b.mouseWheel, this.mouseButton = b.mouseButton, this.keyCode = b.keyCode, this.charCode = b.charCode, this.ctrlPressed = b.ctrlPressed, this.altPressed = b.altPressed, this.shiftPressed = b.shiftPressed) : (this.pagePos = new g, this.mousePos = new g, this.mouseMov = new g, this.charCode = this.keyCode = this.mouseWheel = this.mouseButton = 0, this.shiftPressed = this.altPressed = this.ctrlPressed = !1)
    }

    function f(b) {
        m.ctrlPressed = b.ctrlKey;
        m.altPressed = b.altKey;
        m.shiftPressed = b.shiftKey
    }

    function a() {
        if (u) {
            b.phase = new h;
            oldPhase = null;
            var a = function(a) {
                try {
                    f(a), m.mouseWheel = 0 < (a.detail ? a.detail : -a.wheelDelta) ? 1 : -1, b.phase.mouseWheel(m)
                } catch (d) {}
                a.preventDefault()
            };
            document.addEventListener("DOMMouseScroll", a, !1);
            document.addEventListener("mousewheel", a, !1);
            window.addEventListener("mousemove", function(a) {
                f(a);
                var c = d.getBoundingClientRect();
                m.mousePos.x = Math.floor((m.pagePos.x = a.pageX) - c.left);
                m.mousePos.y = Math.floor((m.pagePos.y = a.pageY) - c.top);
                void 0 != a.movementX ? (m.mouseMov.x = a.movementX, m.mouseMov.y = a.movementY) : void 0 != a.mozMovementX ? (m.mouseMov.x = a.mozMovementX, m.mouseMov.y = a.mozMovementY) : void 0 != a.webkitMovementX && (m.mouseMov.x = a.webkitMovementX, m.mouseMov.y = a.webkitMovementY);
                null != b.phase && b.phase.mouseMove(m);
                a.preventDefault()
            }, !1);
            d.addEventListener("mousedown", function(a) {
                f(a);
                a.preventDefault();
                document.activeElement.blur();
                m.mouseButton |= 1 << a.button;
                null != b.phase && b.phase.mousePress(m)
            }, !1);
            n.oncontextmenu = function() {
                return D
            };
            window.addEventListener("mouseup", function(a) {
                f(a);
                a.preventDefault();
                m.mouseButton &= ~(1 << a.button);
                null != b.phase && b.phase.mouseRelease(m)
            }, !1);
            document.addEventListener("keydown", function(a) {
                f(a);
                m.keyCode = a.keyCode;
                (9 === a.keyCode || 8 === a.keyCode) && a.preventDefault();
                null != b.phase && b.phase.keyPress(m)
            }, !1);
            document.addEventListener("keypress", function(a) {
                f(a);
                m.keyCode = a.keyCode;
                m.charCode = a.charCode;
                null != b.phase && b.phase.charTyped(m);
                a.preventDefault()
            }, !1);
            document.addEventListener("keyup", function(a) {
                f(a);
                m.keyCode = a.keyCode;
                null != b.phase && b.phase.keyRelease(m);
                a.preventDefault()
            }, !1);
            e();
            b.update()
        }
    }

    function e() {
        for (var a = 0; a < p.length; ++a) try {
            p[a](v)
        } catch (d) {
            b.err("postInit routine #" + a, d)
        }
        r = !0
    }

    function c(a) {
        l && window.requestAnimationFrame(c);
        var d = 0;
        0 != s && (d = a - s);
        s = a;
        try {
            b.phase !== oldPhase && (null !== oldPhase && oldPhase.end(), null != b.phase && (b.phase.begin(oldPhase), oldPhase = b.phase, b.phase.wake())), null != b.phase && b.phase.update(d)
        } catch (e) {
            b.err("mainLoop()", e)
        }
    }
    var b = this;
    b.version = 1408337099853;
    b.TAU = 6.283185307179586;
    b.RAD2DEG = 57.2957795131;
    b.DEG2RAD = 0.01745329251;
    b.VIEW2D = 0;
    b.VIEW3D = 1;
    b.NEAREST = 0;
    b.LINEAR = 1;
    b.DRAW = 1;
    b.CACHE = 2;
    b.DRAW_CACHE = b.DRAW | b.CACHE;
    b.Phase = h;
    b.Vector2 = g;
    b.InputState = k;
    var l = !0,
        n = oldPhase = b.phase = null,
        d = null,
        p = [],
        r = !1,
        u = !1,
        v = null,
        A = null,
        m = new k,
        s = 0,
        D = !1;
    b.allowContextMenu = function(a) {
        D = a ? !0 : !1
    };
    b.log = function(a) {
        window.alert(a)
    };
    b.err = function(a, d) {
        try {
            2 > arguments.length ? b.log("ERROR: " + a) : b.log("ERROR: " + a + " : " + d.toString() + " : line " + d.lineNumber + " of file: " + d.fileName)
        } catch (c) {}
    };
    b.warn = function(a, d) {
        try {
            2 > arguments.length ? b.log("WARNING: " + a) : b.log("WARNING: " + a + " : " + d.toString() + " : line " + d.lineNumber + " of file: " + d.fileName)
        } catch (c) {}
    };
    b.onInit = function(a) {
        r ? b.err("Function not added via onInit(), already initialized") : p.push(a)
    };
    b.start = function(d) {
        if (null != v) return b.err("start() called while engine is already running."), !1;
        v = {
            realtime: !0,
            canvas: "viewport"
        };
        if ("undefined" != typeof d && null != d) try {
            v.realtime = d.realtime ? !0 : !1, "undefined" != typeof d.canvas && (v.canvas = d.canvas)
        } catch (c) {
            return b.err("setup object invalid ", c), !1
        }
        return a()
    };
    b.setRealtime = function(a) {
        a && l != a && window.requestAnimationFrame(c);
        l = a
    };
    b.scaleSmoothing = function(a, b) {
        b = b ? !0 : !1;
        a.imageSmoothingEnabled = b;
        a.mozImageSmoothingEnabled = b;
        a.webkitImageSmoothingEnabled = b
    };
    b.setFullScreen = function(a) {
        b.log("Setting screen mode: " + a);
        a ? d.requestFullscreen ? d.requestFullscreen() : d.msRequestFullscreen ? d.msRequestFullscreen() : d.mozRequestFullScreen ? d.mozRequestFullScreen() : d.webkitRequestFullscreen ? d.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT) : b.log("Fullscreen not supported.") : document.exitFullscreen ? document.exitFullscreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : b.log("Fullscreen not supported.")
    };
    b.setPointerLock = function(a) {
        b.log("Setting pointer lock: " + a);
        a ? d.requestPointerLock ? d.requestPointerLock() : d.mozRequestPointerLock ? d.mozRequestPointerLock() : d.webkitRequestPointerLock ? d.webkitRequestPointerLock() : b.log("Pointer lock not supported.") : d.exitPointerLock ? d.exitPointerLock() : d.mozExitPointerLock ? d.mozExitPointerLock() : d.webkitExitPointerLock ? d.webkitExitPointerLock() : b.log("Pointer lock not supported.")
    };
    b.update = function() {
        window.requestAnimationFrame(c)
    };
    A = window.setInterval(function() {
        try {
            n || (n = document.getElementsByTagName("body")[0]);
            if (null != v && null == d)
                if ("string" == typeof v.canvas) {
                    if (d = document.getElementById(v.canvas)) v.canvas = d
                } else d = v.canvas;
            n && d && (window.clearInterval(A), A = null, u = !0, null != v && a())
        } catch (c) {
            b.err("preInit() failed", c)
        }
    }, 250)
};
new function() {
    function h(f) {
        var a = this,
            e = a.value = 0;
        a.advance = function(c) {
            e += c;
            return 0 >= e ? a.value = e = 0 : e >= f ? (e = f, a.value = 1) : a.value = e / f
        };
        a.reset = function(c) {
            e = a.value = 0;
            0 < arguments.length && (f = c)
        }
    }

    function g(f, a, e) {
        var c = this;
        2 <= arguments.length ? (c.x = f, c.y = a, c.z = e) : 1 == arguments.length ? (c.x = f.x, c.y = f.y, c.z = f.z) : c.x = c.y = c.z = 0;
        this.toString = function() {
            return "{x:" + c.x + ",y:" + c.y + ",z:" + c.z + "}"
        }
    }
    var k = System;
    k.LinkedList = function() {
        var f = null,
            a = null;
        this.first = function() {
            return f
        };
        this.last = function() {
            return a
        };
        this.add = function(e) {
            null == f ? f = e : a.next = e;
            e.prior = a;
            a = e
        };
        this.unlink = function(e) {
            null == e.next ? a = e.prior : e.next.prior = e.prior;
            null == e.prior ? f = e.next : e.prior.next = e.next;
            e.prior = e.next = null
        };
        this.insert = function(e, c) {
            null == c && (c = f);
            null == c ? a = f = e : (c === f ? f = e : c.prior.next = e, e.prior = c.prior, c.prior = e, e.next = c)
        };
        this.empty = function() {
            f = a = null
        };
        this.attach = function(e) {
            null == f ? (f = e.first(), a = e.last()) : (a.next = e.first(), null != a.next && (a.next.prior = a, a = e.last()));
            e.empty()
        }
    };
    k.LCPRNG = function(f, a) {
        var e = this,
            c = [],
            b = 0;
        e.seed = function(l) {
            if (0 < arguments.length) {
                c[0] = f = l | 0;
                for (var g = a - 1, d = 1; d < g; ++d) c[d] = 16807 * c[d - 1] & 2147483647;
                c[g] = c[0];
                c[0] = c[1];
                c[1] = c[2];
                b = 2;
                g = a << 4;
                for (d = 0; d < g; ++d) e.rand()
            }
            return f
        };
        e.rand = function() {
            var e = b;
            b = (b + 1) % a;
            return c[e] = c[b] + c[(b + 29) % a] >> 0
        };
        e.toString = function() {
            return e.seed()
        };
        1 > arguments.length && (f = 1);
        2 > arguments.length && (a = 32);
        e.seed(f)
    };
    k.LinearInterp = h;
    k.SineInterp = function(f) {
        var a = this;
        a.value = 0;
        var e = new h(f),
            c = Math.PI / 2;
        a.advance = function(b) {
            b = e.advance(b);
            return 1 == b ? a.value = 1 : 0 == b ? a.value = 0 : a.value = Math.sin(b * c)
        };
        a.reset = function(b) {
            a.value = 0;
            0 < arguments.length ? e.reset(b) : e.reset()
        }
    };
    k.CosineInterp = function(f) {
        var a = this;
        a.value = 0;
        var e = new h(f),
            c = Math.PI;
        a.advance = function(b) {
            b = e.advance(b);
            return 1 == b ? a.value = 1 : 0 == b ? a.value = 0 : a.value = 0.5 * (1 - Math.cos(b * c))
        };
        a.reset = function(b) {
            a.value = 0;
            0 < arguments.length ? e.reset(b) : e.reset()
        }
    };
    k.Vector3 = g;
    k.Box3 = function(f, a, e, c, b, l) {
        var n = this;
        5 <= arguments.length ? (n.a = new g(f, a, e), n.b = new g(c, b, l)) : 1 < arguments.length ? (n.a = new g(f), n.b = new g(a)) : 1 == arguments.length ? (n.a = new g(f.a), n.b = new g(f.b)) : (n.a = new g, n.b = new g);
        this.toString = function() {
            return "{a:" + n.a + ",b:" + n.b + "}"
        }
    };
    k.cross = function(f, a, e) {
        e.x = f.y * a.z - f.z * a.y;
        e.y = f.z * a.x - f.x * a.z;
        e.z = f.x * a.y - f.y * a.x
    }
};
new function() {
    function h(f, a) {
        function e(b) {
            if (!b.isLoaded) {
                b.isLoaded = !0;
                try {
                    var d = eval(l.responseText);
                    a(d)
                } catch (c) {
                    a(null)
                }
            }
        }
        var c = document.getElementsByTagName("body")[0];
        if (!c) return !1;
        if (k) {
            _JSE_ = null;
            var b = document.createElement("script");
            b.onload = function() {
                a(_JSE_);
                c.removeChild(b)
            };
            b.onerror = function() {
                g.log("fetchObj() failed to load: " + f);
                c.removeChild(b);
                a(null)
            };
            b.src = f;
            c.appendChild(b)
        } else {
            var l = new XMLHttpRequest;
            l.isLoaded = !1;
            l.onreadystatechange = function() {
                4 === l.readyState && e(l)
            };
            l.onload = function() {
                e(l)
            };
            l.ontimeout = function() {
                g.log("fetchObj() failed to download: " + f);
                a(null)
            };
            l.open("GET", f, !0);
            l.send(null)
        }
    }
    var g = System,
        k = "file:" == window.location.protocol;
    g.fetchObject = h;
    g.ImageLoader = function(f, a) {
        this.fails = this.loaded = this.count = 0;
        this.queue = function(b, l) {
            var g = new Image;
            b = f + b;
            g.onload = function() {
                var d = b;
                try {
                    e.loaded++, a && a(g, !0, d, l)
                } catch (c) {}
            };
            g.onerror = function() {
                var d = b;
                try {
                    e.fails++, a && a(g, !1, d, l)
                } catch (c) {}
            };
            g.src = b;
            c[c.length] = g;
            e.count = c.length
        };
        var e = this,
            c = [];
        void 0 == f && (f = "")
    };
    g.Asset = function(f, a, e, c, b, l) {
        function g(a, b) {
            null != a && (d.flag = a ? d.flag | b : d.flag & ~b);
            return 0 < (d.flag & b) ? !0 : !1
        }
        var d = this;
        d.type = f ? f : "unknown";
        d.name = a ? a : "";
        d.path = e ? e : "";
        d.flag = c ? c : 0;
        d.rev = l ? l : 0;
        5 <= arguments.length ? d.id = b : (d.id = assets.length, d.flag |= 6);
        assets[d.id] = d;
        d.loaded = function(a) {
            return g(1 > arguments.length ? null : a, 1)
        };
        d.stow = function(a) {
            return g(1 > arguments.length ? null : a, 2)
        };
        d.updated = function(a) {
            return g(1 > arguments.length ? null : a, 4)
        };
        d.customJSE = function() {
            return null
        };
        d.toString = function() {
            var a = d.customJSE(),
                b = d.flags;
            d.loaded(!1);
            d.updated(!1);
            a = "{\tid :\t" + d.id + ",\n\trev :\t" + d.rev + ",\n\tflag :\t" + d.flag + ",\n\ttype :\t" + JSON.stringify(d.type) + ",\n\tname :\t" + JSON.stringify(d.name) + ",\n\tpath :\t" + JSON.stringify(d.path) + (null == a ? "" : ",\n\t" + a) + "\n}";
            d.flags = b;
            return a
        }
    };
    g.AssetManager = function(f) {
        var a = this,
            e = {},
            c = {},
            b = {};
        f = 1 > arguments.length ? "" : f.toString();
        a.register = function(a, c) {
            b[a] = c
        };
        a.storeAll = function(b, c, d) {
            var f = 0,
                g;
            for (g in e) {
                var h = e[g];
                null == h || b && "function" == typeof h.updated && !h.updated() || (++f, a.store(h, c, d))
            }
            return f
        };
        a.store = function(a, b, d) {
            if (d) {
                g.log("Error: AssetManager.store(): Remote storage unimplemented.", "#911");
                try {
                    b(a, 0)
                } catch (c) {
                    g.log("Error: AssetManager.store() callback(data,0): " + c)
                }
            } else if (localStorage) try {
                localStorage.setItem(a.path, "_JSE_=" + a.toString());
                try {
                    b(a, 1)
                } catch (e) {
                    g.log("Error: AssetManager.store() callback(data,1): " + e)
                }
            } catch (f) {
                g.log("Error: AssetManager.store() localStorage.setItem(): " + f);
                try {
                    b(a, 0)
                } catch (h) {
                    g.log("Error: AssetManager.store() callback(data,0): " + h)
                }
            } else {
                g.log("Error: AssetManager.store(): No localStorage");
                try {
                    b(a, 0)
                } catch (k) {
                    g.log("Error: AssetManager.store() callback(data,0): " + k)
                }
            }
        };
        a.fetch = function(a, k, d) {
            3 > arguments.length && (d = !1);
            var p = e[a];
            if (p) {
                try {
                    g.log("AM: already loaded: " + a), k(p, a)
                } catch (r) {
                    return g.log("AssetManager callback error '" + f + a + "': " + r, "#911"), -1
                }
                return 0
            }
            var u = c[a];
            if (u) return d || u.push(func), 3;
            var u = c[a] = [k],
                v = function(d) {
                    if (null == d)
                        for (var h in u) try {
                            u[h](null, a)
                        } catch (k) {
                            g.log("AssetManager callback error '" + f + a + "': " + k, "#911")
                        } else {
                            if (d.type) {
                                var n = b[d.type];
                                if (n) try {
                                    d = n(d, a)
                                } catch (p) {
                                    g.log("AssetManager creation error '" + f + a + "': " + p, "#911");
                                    for (h in u) try {
                                        var r = u[h];
                                        r && r(null, a)
                                    } catch (G) {
                                        g.log("AssetManager callback error '" + f + a + "': " + G, "#911")
                                    }
                                    delete c[a];
                                    return
                                }
                            }
                            e[a] = d;
                            for (h in u) try {
                                (r = u[h]) && r(d, a)
                            } catch (T) {
                                g.log("AssetManager callback error '" + f + a + "': " + T, "#911")
                            }
                        }
                    delete c[a]
                };
            if (localStorage && (p = localStorage.getItem(a), null != p)) try {
                return v(eval(p)), 1
            } catch (A) {
                g.log("AssetManager localStorage eval() error '" + a + "': " + A + "\n" + p.toString(), "#911")
            }
            h(f + a, v);
            return 2
        };
        a.getAsset = function(a) {
            a = e[a];
            return void 0 != typeof a ? a : null
        };
        a.setAsset = function(a, b) {
            null === b ? delete e[a] : e[a] = b
        }
    };
    g.getAsset = function(f) {
        f = assets[f];
        return void 0 == typeof f ? null : f
    }
};
var M = "'use asm';var _1=new std.Uint8Array(heap);var $1=new std.Int8Array(heap);var _2=new std.Uint16Array(heap);var $2=new std.Int16Array(heap);var _4=new std.Uint32Array(heap);var $4=new std.Int32Array(heap);var $f=new std.Float32Array(heap);var $d=new std.Float64Array(heap);var abs=std.Math.abs;var atan2=std.Math.atan2;var ceil=std.Math.ceil;var cos=std.Math.cos;var exp=std.Math.exp;var floor=std.Math.floor;var fround=std.Math.fround;var log=std.Math.log;var sin=std.Math.sin;var sqrt=std.Math.sqrt;var tan=std.Math.tan;var error=foriegn.error;var imul=foriegn.imul;var logs=foriegn.logs;var logv=foriegn.logv;var wait=foriegn.wait;var time=foriegn.time;const E_NONE=0;const E_PERM=1;const E_NOMEM=2;const E_INVALID=3;const E_ACCESS=4;const E_ALIGN=5;const E_UNKNOWN=6;const E_ENV=7;const E_HALT=8;const E_NOSUPPORT=9;var version=0x00000000;var spine=0;var body=0;var ini=0;var dead=1;var ring=0;var lastError=0;var lock0=0;var lock1=0;var lock2=0;var lock3=0;var fingerCnt=0;var fing0=0;var fing1=0;var fing2=0;var fing3=0;var mark=0;var born=0.0;var delta=0.0;var free=0;var seed=0;var v0=0;var v1=0;var v2=0;var v3=0;var f0=0.0;var op=0;var cute=0;var cmp=0;var ret=0;var rVirt=0;var rSig=0;var rHeap=0;var rParam=0;var rText=0;var rEntity=0;var rCode=0;var rCall=0;var attr=0;function addition(){var slot=0;var base=0;var size=0;var f=0.0;var x0=0;var x1=0;var x2=0;var x3=0;size=(cute>>>8)&7;slot=(cute>>>16)&0xFF;if(cute&0x0800){switch((base=(cute>>12)&7)){case 0:if(ring)err(E_PERM);switch(slot|0){case 0x01:rHeap=(rHeap+v0)|0;return;case 0x02:rParam=(rParam+v0)|0;return;case 0x03:rText=(rText+v0)|0;return;case 0x04:rEntity=(rEntity+v0)|0;return;case 0x05:rCode=(rCode+v0)|0;return;case 0x06:rCall=(rCall+v0)|0;return;case 0x07:err(E_INVALID);case 0x08:err(E_INVALID);case 0x09:body=(body+v0)|0;return;case 0x0A:spine=(spine+v0)|0;return;case 0x0B:free=(free+v0)|0;return;case 0x0C:seed=(seed+v0)|0;return;case 0x0D:rSig=(rSig+v0)|0;return;case 0x0E:rVirt=(rVirt+v0)|0;return;case 0x0F:op=(op+v0)|0;return;default:err(E_INVALID);}case 1:base=rHeap;break;case 2:base=rParam;break;case 3:base=rText;break;case 4:base=rEntity;break;case 5:base=rCode;break;case 6:base=rCall;break;case 7:base=0;}base=(base+(_4[(rParam+slot)>>2]>>>0))>>>0;}else base=(rParam+slot)|0;switch(size|0){case 0:_1[base]=(_1[base]>>>0)+v0;return;case 1:_2[base>>1]=(_2[base>>1]>>>0)+v0;return;case 2:_4[base>>2]=(_4[base>>2]>>>0)+v0;return;case 3:slot=(_4[base>>2]=(size=_4[base>>2]|0)+v0)|0;base=(base+4)|0;if((slot>>>0)<(size>>>0))_4[base>>2]=(_4[base>>2]|0)+v1+1;else _4[base>>2]=(_4[base>>2]|0)+v1;return;case 4:x0=_4[base>>2]>>>0;x1=_4[(base+4)>>2]>>>0;x2=_4[(base+8)>>2]>>>0;x3=_4[(base+12)>>2]>>>0;_4[base>>2]=slot=(x0+v0)|0;if((slot>>>0)<(x0>>>0)){x1=((slot=x1)+1)|0;if((x1>>>0)<(slot>>>0)){x2=((slot=x2)+1)|0;if((x2>>>0)<(slot>>>0))x3=(x3+1)|0;}}_4[(base+4)>>2]=slot=(x1+v1)|0;if((slot>>>0)<(x1>>>0)){x2=((slot=x2)+1)|0;if((x2>>>0)<(slot>>>0))x3=(x3+1)|0;}_4[(base+8)>>2]=slot=(x2+v2)|0;if((slot>>>0)<(x2>>>0))x3=(x3+1)|0;_4[(base+12)>>2]=(x3+v3)|0;return;case 5:$f[base>>2]=$f[base>>2]+fround(f0);return;case 6:$d[base>>3]=$d[base>>3]+f0;return;case 7:default:err(E_NOSUPPORT);}}function attrib(fg,bg,ch){fg=fg|0;bg=bg|0;ch=ch|0;if(dead)return;attr=(((bg<<4)|fg)<<8)|ch;}function $_attrib(fg,bg,ch){fg=fg|0;bg=bg|0;ch=ch|0;if(notRoot()|0)return;attrib(fg,bg,ch);}function bitAND(){var slot=0;var base=0;var size=0;size=(cute>>>8)&7;slot=(cute>>>16)&0xFF;if(cute&0x0800){switch((base=(cute>>12)&7)){case 0:if(ring)err(E_PERM);switch(slot|0){case 0x01:rHeap=(rHeap&v0)|0;return;case 0x02:rParam=(rParam&v0)|0;return;case 0x03:rText=(rText&v0)|0;return;case 0x04:rEntity=(rEntity&v0)|0;return;case 0x05:rCode=(rCode&v0)|0;return;case 0x06:rCall=(rCall&v0)|0;return;case 0x07:err(E_INVALID);case 0x08:err(E_INVALID);case 0x09:body=(body&v0)|0;return;case 0x0A:spine=(spine&v0)|0;return;case 0x0B:free=(free&v0)|0;return;case 0x0C:seed=(seed&v0)|0;return;case 0x0D:rSig=(rSig&v0)|0;return;case 0x0E:rVirt=(rVirt&v0)|0;return;case 0x0F:op=(op&v0)|0;return;default:err(E_INVALID);}case 1:base=rHeap;break;case 2:base=rParam;break;case 3:base=rText;break;case 4:base=rEntity;break;case 5:base=rCode;break;case 6:base=rCall;break;case 7:base=0;}base=(base+(_4[(rParam+slot)>>2]>>>0))>>>0;}else base=(rParam+slot)|0;switch(size|0){case 0:_1[base]=_1[base]&v0;return;case 1:_2[base>>1]=_2[base>>1]&v0;return;case 4:_4[(base+12)>>2]=_4[(base+12)>>2]&v3;_4[(base+8)>>2]=_4[(base+8)>>2]&v2;case 3:_4[(base+4)>>2]=_4[(base+4)>>2]&v1;case 2:_4[base>>2]=_4[base>>2]&v0;return;default:err(E_NOSUPPORT);}}function bitNOT(){var slot=0;var base=0;var size=0;size=(cute>>>8)&7;slot=(cute>>>16)&0xFF;if(cute&0x0800){switch((base=(cute>>12)&7)){case 0:if(ring)err(E_PERM);switch(slot|0){case 0x01:rHeap=~v0;return;case 0x02:rParam=~v0;return;case 0x03:rText=~v0;return;case 0x04:rEntity=~v0;return;case 0x05:rCode=~v0;return;case 0x06:rCall=~v0;return;case 0x07:err(E_INVALID);case 0x08:err(E_INVALID);case 0x09:body=~v0;return;case 0x0A:spine=~v0;return;case 0x0B:free=~v0;return;case 0x0C:seed=~v0;return;case 0x0D:rSig=~v0;return;case 0x0E:rVirt=~v0;return;case 0x0F:op=~v0;return;default:err(E_INVALID);}case 1:base=rHeap;break;case 2:base=rParam;break;case 3:base=rText;break;case 4:base=rEntity;break;case 5:base=rCode;break;case 6:base=rCall;break;case 7:base=0;}base=(base+(_4[(rParam+slot)>>2]>>>0))>>>0;}else base=(rParam+slot)|0;switch(size|0){case 0:_1[base]=~v0;return;case 1:_2[base>>1]=~v0;return;case 4:_4[(base+12)>>2]=~v3;_4[(base+8)>>2]=~v2;case 3:_4[(base+4)>>2]=~v1;case 2:_4[base>>2]=~v0;return;default:err(E_NOSUPPORT);}}function bitOR(){var slot=0;var base=0;var size=0;size=(cute>>>8)&7;slot=(cute>>>16)&0xFF;if(cute&0x0800){switch((base=(cute>>12)&7)){case 0:if(ring)err(E_PERM);switch(slot|0){case 0x01:rHeap=(rHeap|v0)|0;return;case 0x02:rParam=(rParam|v0)|0;return;case 0x03:rText=(rText|v0)|0;return;case 0x04:rEntity=(rEntity|v0)|0;return;case 0x05:rCode=(rCode|v0)|0;return;case 0x06:rCall=(rCall|v0)|0;return;case 0x07:err(E_INVALID);case 0x08:err(E_INVALID);case 0x09:body=(body|v0)|0;return;case 0x0A:spine=(spine|v0)|0;return;case 0x0B:free=(free|v0)|0;return;case 0x0C:seed=(seed|v0)|0;return;case 0x0D:rSig=(rSig|v0)|0;return;case 0x0E:rVirt=(rVirt|v0)|0;return;case 0x0F:op=(op|v0)|0;return;default:err(E_INVALID);}case 1:base=rHeap;break;case 2:base=rParam;break;case 3:base=rText;break;case 4:base=rEntity;break;case 5:base=rCode;break;case 6:base=rCall;break;case 7:base=0;}base=(base+(_4[(rParam+slot)>>2]>>>0))>>>0;}else base=(rParam+slot)|0;switch(size|0){case 0:_1[base]=_1[base]|v0;return;case 1:_2[base>>1]=_2[base>>1]|v0;return;case 4:_4[(base+12)>>2]=_4[(base+12)>>2]|v3;_4[(base+8)>>2]=_4[(base+8)>>2]|v2;case 3:_4[(base+4)>>2]=_4[(base+4)>>2]|v1;case 2:_4[base>>2]=_4[base>>2]|v0;return;default:err(E_NOSUPPORT);}}function bitSHL(){var slot=0;var base=0;var size=0;if(cute&0x8000){if((cute&0x700)==0x500){cute=(cute-0x300)|0;getSrc();}else v0=cute>>>24;}else getSrc();if((v0|0)==0)return;size=(cute>>>8)&7;slot=(cute>>>16)&0xFF;if(cute&0x0800){switch((base=(cute>>12)&7)){case 0:if(ring)err(E_PERM);switch(slot|0){case 0x01:rHeap=(rHeap<<v0)|0;return;case 0x02:rParam=(rParam<<v0)|0;return;case 0x03:rText=(rText<<v0)|0;return;case 0x04:rEntity=(rEntity<<v0)|0;return;case 0x05:rCode=(rCode<<v0)|0;return;case 0x06:rCall=(rCall<<v0)|0;return;case 0x07:err(E_INVALID);case 0x08:err(E_INVALID);case 0x09:body=(body<<v0)|0;return;case 0x0A:spine=(spine<<v0)|0;return;case 0x0B:free=(free<<v0)|0;return;case 0x0C:seed=(seed<<v0)|0;return;case 0x0D:rSig=(rSig<<v0)|0;return;case 0x0E:rVirt=(rVirt<<v0)|0;return;case 0x0F:op=(op<<v0)|0;return;default:err(E_INVALID);}case 1:base=rHeap;break;case 2:base=rParam;break;case 3:base=rText;break;case 4:base=rEntity;break;case 5:base=rCode;break;case 6:base=rCall;break;case 7:base=0;}base=(base+(_4[(rParam+slot)>>2]>>>0))>>>0;}else base=(rParam+slot)|0;switch(size|0){case 0:_1[base]=_1[base]<<v0;return;case 1:_2[base>>1]=_2[base>>1]<<v0;return;case 2:_4[base>>2]=_4[base>>2]<<v0;return;case 3:if((v0|0)>=32){_4[(base+4)>>2]=_4[base>>2]<<(v0-32);_4[base>>2]=0;}else{_4[base>>2]=(slot=_4[base>>2]|0)<<v0;_4[(base+4)>>2]=(_4[(base+4)>>2]<<v0)|(slot>>>(32-v0));}return;case 4:if((v0|0)>=96){v0=(v0-96)|0;_4[(base+12)>>2]=_4[base>>2]<<v0;_4[(base+8)>>2]=_4[(base+4)>>2]=_4[base>>2]=0;}else if((v0|0)>64){v0=(v0-64)|0;_4[(base+12)>>2]=(_4[(base+4)>>2]<<v0)|((size=_4[base>>2]|0)>>>(32-v0));_4[(base+8)>>2]=size<<v0;_4[(base+4)>>2]=_4[base>>2]=0;}else if((v0|0)==64){_4[(base+12)>>2]=_4[(base+4)>>2]|0;_4[(base+8)>>2]=_4[base>>2]|0;_4[(base+4)>>2]=_4[base>>2]=0;}else if((v0|0)>32){v0=(v0-32)|0;_4[(base+12)>>2]=(_4[(base+8)>>2]<<v0)|((size=_4[(base+4)>>2]|0)>>>(32-v0));_4[(base+8)>>2]=(size<<v0)|((slot=_4[base>>2]|0)>>>(32-v0));_4[(base+4)>>2]=slot<<v0;_4[base>>2]=0;}else if((v0|0)==32){_4[(base+12)>>2]=_4[(base+8)>>2]|0;_4[(base+8)>>2]=_4[(base+4)>>2]|0;_4[(base+4)>>2]=_4[base>>2]|0;_4[base>>2]=0;}else{_4[base>>2]=(slot=_4[base>>2]|0)<<v0;_4[(base+4)>>2]=((size=_4[(base+4)>>2]|0)<<v0)|(slot>>>(32-v0));_4[(base+8)>>2]=((slot=_4[(base+8)>>2]|0)<<v0)|(size>>>(32-v0));_4[(base+12)>>2]=(_4[(base+12)>>2]<<v0)|(slot>>>(32-v0));}return;default:err(E_NOSUPPORT);}}function bitSHR(){var slot=0;var base=0;var size=0;if(cute&0x8000){if((cute&0x700)==0x500){cute=(cute-0x300)|0;getSrc();}else v0=cute>>>24;}else getSrc();if((v0|0)==0)return;size=(cute>>>8)&7;slot=(cute>>>16)&0xFF;if(cute&0x0800){switch((base=(cute>>12)&7)){case 0:if(ring)err(E_PERM);switch(slot|0){case 0x01:rHeap=(rHeap>>>v0)|0;return;case 0x02:rParam=(rParam>>>v0)|0;return;case 0x03:rText=(rText>>>v0)|0;return;case 0x04:rEntity=(rEntity>>>v0)|0;return;case 0x05:rCode=(rCode>>>v0)|0;return;case 0x06:rCall=(rCall>>>v0)|0;return;case 0x07:err(E_INVALID);case 0x08:err(E_INVALID);case 0x09:body=(body>>>v0)|0;return;case 0x0A:spine=(spine>>>v0)|0;return;case 0x0B:free=(free>>>v0)|0;return;case 0x0C:seed=(seed>>>v0)|0;return;case 0x0D:rSig=(rSig>>>v0)|0;return;case 0x0E:rVirt=(rVirt>>>v0)|0;return;case 0x0F:op=(op>>>v0)|0;return;default:err(E_INVALID);}case 1:base=rHeap;break;case 2:base=rParam;break;case 3:base=rText;break;case 4:base=rEntity;break;case 5:base=rCode;break;case 6:base=rCall;break;case 7:base=0;}base=(base+(_4[(rParam+slot)>>2]>>>0))>>>0;}else base=(rParam+slot)|0;switch(size|0){case 0:_1[base]=_1[base]>>>v0;return;case 1:_2[base>>1]=_2[base>>1]>>>v0;return;case 2:_4[base>>2]=_4[base>>2]>>>v0;return;case 3:if((v0|0)>=32){_4[base>>2]=_4[(base+4)>>2]>>>(v0&0x1f);_4[(base+4)>>2]=0;}else{_4[(base+4)>>2]=(slot=_4[(base+4)>>2]|0)>>>v0;_4[base>>2]=(_4[base>>2]>>>v0)|(slot<<(32-v0));}return;case 4:if((v0|0)>=96){v0=v0&0x1f;_4[base>>2]=_4[(base+12)>>2]>>>v0;_4[(base+4)>>2]=_4[(base+8)>>2]=_4[(base+12)>>2]=0;}else if((v0|0)>64){v0=v0&0x1f;_4[(base+4)>>2]=(slot=_4[(base+12)>>2]|0)>>>v0;_4[base>>2]=(_4[(base+8)>>2]>>>v0)|(slot<<(32-v0));_4[(base+8)>>2]=_4[(base+12)>>2]=0;}else if((v0|0)==64){_4[base>>2]=_4[(base+8)>>2]|0;_4[(base+4)>>2]=_4[(base+12)>>2]|0;_4[(base+8)>>2]=_4[(base+12)>>2]=0}else if((v0|0)>32){v0=v0&0x1f;_4[base>>2]=(_4[(base+4)>>2]>>>v0)|((size=_4[(base+8)>>2]|0)<<(32-v0));_4[(base+4)>>2]=(size>>>v0)|((slot=_4[(base+12)>>2]|0)<<(32-v0));_4[(base+8)>>2]=slot>>>v0;_4[(base+12)>>2]=0;}else if((v0|0)==32){_4[base>>2]=_4[(base+4)>>2]|0;_4[(base+4)>>2]=_4[(base+8)>>2]|0;_4[(base+8)>>2]=_4[(base+12)>>2]|0;_4[(base+12)>>2]=0}else{_4[(base+12)>>2]=(slot=_4[(base+12)>>2]|0)>>>v0;_4[(base+8)>>2]=((size=_4[(base+8)>>2]|0)>>>v0)|(slot<<(32-v0));_4[(base+4)>>2]=((slot=_4[(base+4)>>2]|0)>>>v0)|(size<<(32-v0));_4[base>>2]=(_4[base>>2]>>>v0)|(slot<<(32-v0));}return;default:err(E_NOSUPPORT);}}function bitSHRX(){var slot=0;var base=0;var size=0;if(cute&0x8000){if((cute&0x700)==0x500){cute=(cute-0x300)|0;getSrc();}else v0=cute>>>24;}else getSrc();if((v0|0)==0)return;size=(cute>>>8)&7;slot=(cute>>>16)&0xFF;if(cute&0x0800){switch((base=(cute>>12)&7)){case 0:if(ring)err(E_PERM);switch(slot|0){case 0x01:rHeap=(rHeap>>v0)|0;return;case 0x02:rParam=(rParam>>v0)|0;return;case 0x03:rText=(rText>>v0)|0;return;case 0x04:rEntity=(rEntity>>v0)|0;return;case 0x05:rCode=(rCode>>v0)|0;return;case 0x06:rCall=(rCall>>v0)|0;return;case 0x07:err(E_INVALID);case 0x08:err(E_INVALID);case 0x09:body=(body>>v0)|0;return;case 0x0A:spine=(spine>>v0)|0;return;case 0x0B:free=(free>>v0)|0;return;case 0x0C:seed=(seed>>v0)|0;return;case 0x0D:rSig=(rSig>>v0)|0;return;case 0x0E:rVirt=(rVirt>>v0)|0;return;case 0x0F:op=(op>>v0)|0;return;default:err(E_INVALID);}case 1:base=rHeap;break;case 2:base=rParam;break;case 3:base=rText;break;case 4:base=rEntity;break;case 5:base=rCode;break;case 6:base=rCall;break;case 7:base=0;}base=(base+(_4[(rParam+slot)>>2]>>>0))>>>0;}else base=(rParam+slot)|0;switch(size|0){case 0:_1[base]=(_1[base]<<24)>>(24+v0);return;case 1:_2[base>>1]=(_2[base>>1]<<16)>>(16+v0);return;case 2:_4[base>>2]=_4[base>>2]>>v0;return;case 3:if((v0|0)>=32){_4[base>>2]=(slot=_4[(base+4)>>2]|0)>>(v0-32);_4[(base+4)>>2]=slot>>31;}else{_4[(base+4)>>2]=(slot=_4[(base+4)>>2]|0)>>v0;_4[base>>2]=(_4[base>>2]>>>v0)|(slot<<(32-v0));}return;case 4:if((v0|0)>=96){v0=v0&0x1f;_4[base>>2]=(slot=_4[(base+12)>>2]|0)>>v0;_4[(base+4)>>2]=_4[(base+8)>>2]=_4[(base+12)>>2]=slot>>31;}else if((v0|0)>64){v0=v0&0x1f;_4[(base+4)>>2]=(slot=_4[(base+12)>>2]|0)>>v0;_4[base>>2]=(_4[(base+8)>>2]>>>v0)|(slot<<(32-v0));_4[(base+8)>>2]=_4[(base+12)>>2]=slot>>31;}else if((v0|0)==64){_4[base>>2]=_4[(base+8)>>2]|0;_4[(base+4)>>2]=slot=_4[(base+12)>>2]|0;_4[(base+8)>>2]=_4[(base+12)>>2]=slot>>31;}else if((v0|0)>32){v0=v0&0x1f;_4[base>>2]=(_4[(base+4)>>2]>>>v0)|((size=_4[(base+8)>>2]|0)<<(32-v0));_4[(base+4)>>2]=(size>>>v0)|((slot=_4[(base+12)>>2]|0)<<(32-v0));_4[(base+8)>>2]=slot>>v0;_4[(base+12)>>2]=slot>>31;}else if((v0|0)==32){_4[base>>2]=_4[(base+4)>>2]|0;_4[(base+4)>>2]=_4[(base+8)>>2]|0;_4[(base+8)>>2]=slot=_4[(base+12)>>2]|0;_4[(base+12)>>2]=slot>>31;}else{_4[(base+12)>>2]=(slot=_4[(base+12)>>2]|0)>>v0;_4[(base+8)>>2]=((size=_4[(base+8)>>2]|0)>>>v0)|(slot<<(32-v0));_4[(base+4)>>2]=((slot=_4[(base+4)>>2]|0)>>>v0)|(size<<(32-v0));_4[base>>2]=(_4[base>>2]>>>v0)|(slot<<(32-v0));}return;default:err(E_NOSUPPORT);}}function bitSpinL(){var slot=0;var base=0;var size=0;if(cute&0x8000){if((cute&0x700)==0x500){cute=(cute-0x300)|0;getSrc();}else v0=cute>>>24;}else getSrc();if((v0|0)==0)return;size=(cute>>>8)&7;slot=(cute>>>16)&0xFF;if(cute&0x0800){switch((base=(cute>>12)&7)){case 0:if(ring)err(E_PERM);switch(slot|0){case 0x01:rHeap=(rHeap<<v0)|(rHeap>>>(v0-32));return;case 0x02:rParam=(rParam<<v0)|(rParam>>>(v0-32));return;case 0x03:rText=(rText<<v0)|(rText>>>(v0-32));return;case 0x04:rEntity=(rEntity<<v0)|(rEntity>>>(v0-32));return;case 0x05:rCode=(rCode<<v0)|(rCode>>>(v0-32));return;case 0x06:rCall=(rCall<<v0)|(rCall>>>(v0-32));return;case 0x07:err(E_INVALID);case 0x08:err(E_INVALID);case 0x09:body=(body<<v0)|(body>>>(v0-32));return;case 0x0A:spine=(spine<<v0)|(spine>>>(v0-32));return;case 0x0B:free=(free<<v0)|(free>>>(v0-32));return;case 0x0C:seed=(seed<<v0)|(seed>>>(v0-32));return;case 0x0D:rSig=(rSig<<v0)|(rSig>>>(v0-32));return;case 0x0E:rVirt=(rVirt<<v0)|(rVirt>>>(v0-32));return;case 0x0F:op=(op<<v0)|(op>>>(v0-32));return;default:err(E_INVALID);}case 1:base=rHeap;break;case 2:base=rParam;break;case 3:base=rText;break;case 4:base=rEntity;break;case 5:base=rCode;break;case 6:base=rCall;break;case 7:base=0;}base=(base+(_4[(rParam+slot)>>2]>>>0))>>>0;}else base=(rParam+slot)|0;switch(size|0){case 0:_1[base]=((slot=_1[base]|0)<<v0)|(slot>>>(8-v0));return;case 1:_2[base>>1]=((slot=_2[base>>1]|0)<<v0)|(slot>>>(16-v0));return;case 2:_4[base>>2]=((slot=_4[base>>2]|0)<<v0)|(slot>>>(32-v0));return;case 3:if((v0|0)>32){v0=(v0-32)|0;_4[(base+4)>>2]=((slot=_4[base>>2]|0)<<v0)|((size=_4[(base+4)>>2]|0)>>>(32-v0));_4[base>>2]=(size<<v0)|(slot>>>(32-v0));}else if((v0|0)==32){slot=_4[base>>2]|0;_4[base>>2]=_4[(base+4)>>2];_4[(base+4)>>2]=slot;}else{_4[base>>2]=((slot=_4[base>>2]|0)<<v0)|((size=_4[(base+4)>>2]|0)>>>(32-v0));_4[(base+4)>>2]=(size<<v0)|(slot>>>(32-v0));}return;case 4:if((v0|0)>96){v0=v0&0x1f;_4[base>>2]=((size=_4[base>>2]|0)>>>(32-v0))|((slot=_4[(base+4)>>2]|0)<<v0);_4[(base+4)>>2]=(slot>>>(32-v0))|((slot=_4[(base+8)>>2]|0)<<v0);_4[(base+8)>>2]=(slot>>>(32-v0))|((slot=_4[(base+12)>>2]|0)<<v0);_4[(base+12)>>2]=(slot>>>(32-v0))|(size<<v0);}else if((v0|0)==96){slot=_4[base>>2]|0;_4[base>>2]=_4[(base+4)>>2];_4[(base+4)>>2]=_4[(base+8)>>2];_4[(base+8)>>2]=_4[(base+12)>>2];_4[(base+12)>>2]=slot;}else if((v0|0)>64){slot=v0&0x1f;size=(32-slot)|0;v0=_4[base>>2]|0;v1=_4[(base+4)>>2]|0;v2=_4[(base+8)>>2]|0;v3=_4[(base+12)>>2]|0;_4[base>>2]=(v2<<slot)|(v1>>>size);_4[(base+4)>>2]=(v3<<slot)|(v2>>>size);_4[(base+8)>>2]=(v0<<slot)|(v3>>>size);_4[(base+12)>>2]=(v1<<slot)|(v0>>>size);}else if((v0|0)==64){slot=_4[(base+12)>>2]|0;size=_4[base>>2]|0;_4[(base+12)>>2]=_4[(base+4)>>2];_4[(base+4)>>2]=slot;_4[base>>2]=_4[(base+8)>>2];_4[(base+8)>>2]=size;}else if((v0|0)>32){slot=v0&0x1f;size=(32-slot)|0;v0=_4[base>>2]|0;v1=_4[(base+4)>>2]|0;v2=_4[(base+8)>>2]|0;v3=_4[(base+12)>>2]|0;_4[base>>2]=(v3<<slot)|(v2>>>size);_4[(base+4)>>2]=(v0<<slot)|(v3>>>size);_4[(base+8)>>2]=(v1<<slot)|(v0>>>size);_4[(base+12)>>2]=(v2<<slot)|(v1>>>size);}else if((v0|0)==32){slot=_4[base>>2]|0;_4[base>>2]=_4[(base+12)>>2];_4[(base+12)>>2]=_4[(base+8)>>2];_4[(base+8)>>2]=_4[(base+4)>>2];_4[(base+4)>>2]=slot;}else{_4[base>>2]=((size=_4[(base+12)>>2]|0)>>>(32-v0))|((slot=_4[base>>2]|0)<<v0);_4[(base+4)>>2]=(slot>>>(32-v0))|((slot=_4[(base+4)>>2]|0)<<v0);_4[(base+8)>>2]=(slot>>>(32-v0))|((slot=_4[(base+8)>>2]|0)<<v0);_4[(base+12)>>2]=(slot>>>(32-v0))|(size<<v0);}return;default:err(E_NOSUPPORT);}}function bitSpinR(){var slot=0;var base=0;var size=0;if(cute&0x8000){if((cute&0x700)==0x500){cute=(cute-0x300)|0;getSrc();}else v0=cute>>>24;}else getSrc();if((v0|0)==0)return;size=(cute>>>8)&7;slot=(cute>>>16)&0xFF;if(cute&0x0800){switch((base=(cute>>12)&7)){case 0:if(ring)err(E_PERM);switch(slot|0){case 0x01:rHeap=(rHeap>>>v0)|(rHeap<<(v0-32));return;case 0x02:rParam=(rParam>>>v0)|(rParam<<(v0-32));return;case 0x03:rText=(rText>>>v0)|(rText<<(v0-32));return;case 0x04:rEntity=(rEntity>>>v0)|(rEntity<<(v0-32));return;case 0x05:rCode=(rCode>>>v0)|(rCode<<(v0-32));return;case 0x06:rCall=(rCall>>>v0)|(rCall<<(v0-32));return;case 0x07:err(E_INVALID);case 0x08:err(E_INVALID);case 0x09:body=(body>>>v0)|(body<<(v0-32));return;case 0x0A:spine=(spine>>>v0)|(spine<<(v0-32));return;case 0x0B:free=(free>>>v0)|(free<<(v0-32));return;case 0x0C:seed=(seed>>>v0)|(seed<<(v0-32));return;case 0x0D:rSig=(rSig>>>v0)|(rSig<<(v0-32));return;case 0x0E:rVirt=(rVirt>>>v0)|(rVirt<<(v0-32));return;case 0x0F:op=(op>>>v0)|(op<<(v0-32));return;default:err(E_INVALID);}case 1:base=rHeap;break;case 2:base=rParam;break;case 3:base=rText;break;case 4:base=rEntity;break;case 5:base=rCode;break;case 6:base=rCall;break;case 7:base=0;}base=(base+(_4[(rParam+slot)>>2]>>>0))>>>0;}else base=(rParam+slot)|0;switch(size|0){case 0:_1[base]=((slot=_1[base]|0)>>>v0)|(slot<<(8-v0));return;case 1:_2[base>>1]=((slot=_2[base>>1]|0)>>>v0)|(slot<<(16-v0));return;case 2:_4[base>>2]=((slot=_4[base>>2]|0)>>>v0)|(slot<<(32-v0));return;case 3:if((v0|0)>32){v0=(v0-32)|0;_4[base>>2]=((slot=_4[(v1=(base+4)|0)>>2]|0)>>>v0)|((size=_4[base>>2]|0)<<(32-v0));_4[v1>>2]=(size>>>v0)|(slot<<(32-v0));}else if((v0|0)==32){slot=_4[base>>2]|0;_4[base>>2]=_4[(base+4)>>2];_4[(base+4)>>2]=slot;}else{_4[base>>2]=((slot=_4[base>>2]|0)>>>v0)|((size=_4[(v1=(base+4)|0)>>2]|0)<<(32-v0));_4[v1>>2]=(size>>>v0)|(slot<<(32-v0));}return;case 4:if((v0|0)>96){v0=(v0-96)|0;_4[base>>2]=((size=_4[(base+12)>>2]|0)>>>v0)|((slot=_4[base>>2]|0)<<(32-v0));_4[(base+4)>>2]=(slot>>>v0)|((slot=_4[(base+4)>>2]|0)<<(32-v0));_4[(base+8)>>2]=(slot>>>v0)|((slot=_4[(base+8)>>2]|0)<<(32-v0));_4[(base+12)>>2]=(slot>>>v0)|(size<<(32-v0));}else if((v0|0)==96){slot=_4[base>>2]|0;_4[base>>2]=_4[(base+12)>>2];_4[(base+12)>>2]=_4[(base+8)>>2];_4[(base+8)>>2]=_4[(base+4)>>2];_4[(base+4)>>2]=slot;}else if((v0|0)>64){slot=(v0-64)|0;size=(32-slot)|0;v0=_4[base>>2]|0;v1=_4[(base+4)>>2]|0;v2=_4[(base+8)>>2]|0;v3=_4[(base+12)>>2]|0;_4[base>>2]=(v2>>>slot)|(v3<<size);_4[(base+4)>>2]=(v3>>>slot)|(v0<<size);_4[(base+8)>>2]=(v0>>>slot)|(v1<<size);_4[(base+12)>>2]=(v1>>>slot)|(v2<<size);}else if((v0|0)==64){slot=_4[(base+12)>>2]|0;size=_4[base>>2]|0;_4[(base+12)>>2]=_4[(base+4)>>2];_4[(base+4)>>2]=slot;_4[base>>2]=_4[(base+8)>>2];_4[(base+8)>>2]=size;}else if((v0|0)>32){slot=v0&0x1f;size=(32-slot)|0;v0=_4[base>>2]|0;v1=_4[(base+4)>>2]|0;v2=_4[(base+8)>>2]|0;v3=_4[(base+12)>>2]|0;_4[base>>2]=(v1>>>slot)|(v2<<size);_4[(base+4)>>2]=(v2>>>slot)|(v3<<size);_4[(base+8)>>2]=(v3>>>slot)|(v0<<size);_4[(base+12)>>2]=(v0>>>slot)|(v1<<size);}else if((v0|0)==32){slot=_4[base>>2]|0;_4[base>>2]=_4[(base+4)>>2];_4[(base+4)>>2]=_4[(base+8)>>2];_4[(base+8)>>2]=_4[(base+12)>>2];_4[(base+12)>>2]=slot;}else{_4[base>>2]=((slot=_4[base>>2]|0)>>>v0)|((size=_4[(base+4)>>2]|0)<<(32-v0));_4[(base+4)>>2]=(size>>>v0)|((size=_4[(base+8)>>2]|0)<<(32-v0));_4[(base+8)>>2]=(size>>>v0)|((size=_4[(base+12)>>2]|0)<<(32-v0));_4[(base+12)>>2]=(size>>>v0)|(slot<<(32-v0));}return;default:err(E_NOSUPPORT);}}function bitXOR(){var slot=0;var base=0;var size=0;size=(cute>>>8)&7;slot=(cute>>>16)&0xFF;if(cute&0x0800){switch((base=(cute>>12)&7)){case 0:if(ring)err(E_PERM);switch(slot|0){case 0x01:rHeap=(rHeap^v0)|0;return;case 0x02:rParam=(rParam^v0)|0;return;case 0x03:rText=(rText^v0)|0;return;case 0x04:rEntity=(rEntity^v0)|0;return;case 0x05:rCode=(rCode^v0)|0;return;case 0x06:rCall=(rCall^v0)|0;return;case 0x07:err(E_INVALID);case 0x08:err(E_INVALID);case 0x09:body=(body^v0)|0;return;case 0x0A:spine=(spine^v0)|0;return;case 0x0B:free=(free^v0)|0;return;case 0x0C:seed=(seed^v0)|0;return;case 0x0D:rSig=(rSig^v0)|0;return;case 0x0E:rVirt=(rVirt^v0)|0;return;case 0x0F:op=(op^v0)|0;return;default:err(E_INVALID);}case 1:base=rHeap;break;case 2:base=rParam;break;case 3:base=rText;break;case 4:base=rEntity;break;case 5:base=rCode;break;case 6:base=rCall;break;case 7:base=0;}base=(base+(_4[(rParam+slot)>>2]>>>0))>>>0;}else base=(rParam+slot)|0;switch(size|0){case 0:_1[base]=_1[base]^v0;return;case 1:_2[base>>1]=_2[base>>1]^v0;return;case 4:_4[(base+12)>>2]=_4[(base+12)>>2]^v3;_4[(base+8)>>2]=_4[(base+8)>>2]^v2;case 3:_4[(base+4)>>2]=_4[(base+4)>>2]^v1;case 2:_4[base>>2]=_4[base>>2]^v0;return;default:err(E_NOSUPPORT);}}function cls(){var i=0;for(;(i|0)<8000;i=(i+4)|0)_4[i>>2]=attr;_4[8004>>2]=_4[8004>>2]|1;}function $_cls(){if(dead)return;cls();}function compare(){var slot=0;var base=0;var size=0;var x0=0;var x1=0;var x2=0;var x3=0;var f=0.0;size=(cute>>>8)&7;slot=(cute>>>16)&0xFF;if(cute&0x0800){switch((base=(cute>>12)&7)){case 0:if(ring)err(E_PERM);switch(slot|0){case 0x01:base=rHeap;break;case 0x02:base=rParam;break;case 0x03:base=rText;break;case 0x04:base=rEntity;break;case 0x05:base=rCode;break;case 0x06:base=rCall;break;case 0x07:base=(ring<<2)|cmp;break;case 0x08:err(E_INVALID);break;case 0x09:base=body;break;case 0x0A:base=spine;break;case 0x0B:base=free;break;case 0x0C:base=seed;break;case 0x0D:base=rSig;break;case 0x0E:base=rVirt;break;case 0x0F:base=(op-rCode)|0;break;default:err(E_INVALID);}if(cmp=(base-v0)|0)cmp=((base^v0^cmp)>>>31)|(cmp&0x80000001);else cmp=2;return;case 1:base=rHeap;break;case 2:base=rParam;break;case 3:base=rText;break;case 4:base=rEntity;break;case 5:base=rCode;break;case 6:base=rCall;break;case 7:base=0;}base=(base+(_4[(rParam+slot)>>2]>>>0))>>>0;}else base=(rParam+slot)|0;cmp=0;switch(size|0){case 0:base=_1[base]>>>0;if(cmp=(base-v0)|0)cmp=(((base^v0^cmp)>>>7)|(cmp<<24))&0x80000001;else cmp=2;return;case 1:base=_2[base>>1]>>>0;if(cmp=(base-v0)|0)cmp=(((base^v0^cmp)>>>15)|(cmp<<16))&0x80000001;else cmp=2;return;case 2:base=_4[base>>2]>>>0;if(cmp=(base-v0)|0)cmp=((base^v0^cmp)>>>31)|(cmp&0x80000000);else cmp=2;return;case 3:slot=((size=_4[base>>2]|0)-v0)|0;base=(base+4)|0;if((slot>>>0)>(size>>>0))cmp=((_4[base>>2]|0)-v1-1)|0;else cmp=((base=_4[base>>2]|0)-v1)|0;if(cmp|slot)cmp=((base^v1^cmp)>>>31)|(cmp&0x80000000);else cmp=2;return;case 4:x0=_4[base>>2]>>>0;x1=_4[(base+4)>>2]>>>0;x2=_4[(base+8)>>2]>>>0;size=x3=_4[(base+12)>>2]>>>0;base=slot=(x0-v0)|0;if((slot>>>0)>(x0>>>0)){x1=((slot=x1)-1)|0;if((x1>>>0)>(slot>>>0)){x2=((slot=x2)-1)|0;if((x2>>>0)>(slot>>>0))x3=(x3-1)|0;}}base=base|(slot=(x1-v1)|0);if((slot>>>0)>(x1>>>0)){x2=((slot=x2)-1)|0;if((x2>>>0)>(slot>>>0))x3=(x3-1)|0;}base=base|(slot=(x2-v2)|0);if((slot>>>0)>(x2>>>0))x3=(x3-1)|0;cmp=(x3-v3)|0;if(cmp|base)cmp=((size^v3^cmp)>>>31)|(cmp&0x80000000);else cmp=2;return;case 5:f=+$f[base>>2];if(f==f0)cmp=2;else{if(f<f0)cmp=0x80000001;else cmp=0;}return;case 6:f=+$d[base>>3];if(f==f0)cmp=2;else{if(f<f0)cmp=0x80000001;else cmp=0;}return;case 7:default:err(E_NOSUPPORT);}}function convInt32(){var slot=0;var base=0;var size=0;size=(cute>>>8)&7;slot=(cute>>>16)&0xFF;/*if(cute&0x0800){switch((base=(cute>>12)&7)){case 0:if(ring)err(E_PERM);switch(slot|0){case 0x01:rHeap=(rHeap|v0)|0;return;case 0x02:rParam=(rParam|v0)|0;return;case 0x03:rText=(rText|v0)|0;return;case 0x04:rEntity=(rEntity|v0)|0;return;case 0x05:rCode=(rCode|v0)|0;return;case 0x06:rCall=(rCall|v0)|0;return;case 0x07:err(E_INVALID);case 0x08:err(E_INVALID);case 0x09:body=(body|v0)|0;return;case 0x0A:spine=(spine|v0)|0;return;case 0x0B:free=(free|v0)|0;return;case 0x0C:seed=(seed|v0)|0;return;case 0x0D:rSig=(rSig|v0)|0;return;case 0x0E:rVirt=(rVirt|v0)|0;return;case 0x0F:op=(op|v0)|0;return;default:err(E_INVALID);}case 1:base=rHeap;break;case 2:base=rParam;break;case 3:base=rText;break;case 4:base=rEntity;break;case 5:base=rCode;break;case 6:base=rCall;break;case 7:base=0;}base=(base+(_4[(rParam+slot)>>2]>>>0))>>>0;}else base=(rParam+slot)|0;switch(size|0){case 0:_1[base]=_1[base]|v0;return;case 1:_2[base>>1]=_2[base>>1]|v0;return;case 4:_4[(base+12)>>2]=_4[(base+12)>>2]|v3;_4[(base+8)>>2]=_4[(base+8)>>2]|v2;case 3:_4[(base+4)>>2]=_4[(base+4)>>2]|v1;case 2:_4[base>>2]=_4[base>>2]|v0;return;default:err(E_NOSUPPORT);}*/}function $_crash(addr){addr=addr|0;if(ring)err(E_PERM);dead=1;_4[addr>>2]=lastError;_4[(addr+4)>>2]=spine;_4[(addr+8)>>2]=body;}function $_cycle(tics){tics=tics|0;var row=0;var col=0;if(dead)err(E_INVALID);for(;(tics|0)>0;tics=(tics-1)|0){cute=_4[op>>2]>>>0;op=(op+4)>>>0;switch(cute&0xff){case 0x00:if(ring)err(E_PERM);dead=1;err(E_HALT);break;case 0x01:getSrc();err(v0);break;case 0x02:getSrc();wait(v0|0);break;case 0x03:v0=v1=v2=v3=0;getSrc();finger();fingerCnt=(fingerCnt+1)|0;setDst();break;case 0x04:fing0=fing1=fing2=fing3=fingerCnt=0;break;case 0x05:enhance();setDst();break;case 0x06:v0=16;v1=v2=v3=0;setDst();break;case 0x07:if(ring)err(E_PERM);enhance();lock0=v0;lock1=v1;lock2=v2;lock3=v3;break;case 0x08:getSrc();cute=v0;if((ring|0)>(cute&1)){enhance();if(((lock0|0)!=(v0|0))|((lock1|0)!=(v1|0))|((lock2|0)!=(v2|0))|((lock3|0)!=(v3|0)))err(E_PERM);}ring=cute&1;break;case 0x09:getSrc();setDst();break;case 0x0a:getSrc();compare();break;case 0x0b:getSrc();switch((cute>>18)&0x3f){case 0:op=(rCode+v0)>>>0;break;case 1:if(cmp&2)op=(rCode+v0)>>>0;break;case 2:if(cmp&0x80000000)op=(rCode+v0)>>>0;break;case 3:if(cmp&0x80000002)op=(rCode+v0)>>>0;break;case 4:if((cmp&0x80000002)==0)op=(rCode+v0)>>>0;break;case 5:if((cmp&0x80000000)==0)op=(rCode+v0)>>>0;break;case 6:if((cmp&2)==0)op=(rCode+v0)>>>0;break;case 7:if(cmp&1)op=(rCode+v0)>>>0;break;case 8:if(cmp&3)op=(rCode+v0)>>>0;break;case 9:if((cmp&3)==0)op=(rCode+v0)>>>0;break;case 10:if((cmp&1)==0)op=(rCode+v0)>>>0;break;default:err(E_INVALID);}break;case 0x0c:err(E_NOSUPPORT);case 0x0d:getSrc();addition();break;case 0x0e:getSrc();subtraction();break;case 0x0f:getSrc();bitNOT();break;case 0x10:getSrc();bitXOR();break;case 0x11:getSrc();bitAND();break;case 0x12:getSrc();bitOR();break;case 0x13:bitSHL();break;case 0x14:bitSHRX();break;case 0x15:bitSHR();break;case 0x16:bitSpinL();break;case 0x17:bitSpinR();break;case 0x18:getSrc();signExtend();break;case 0x19:getSrc();negate();break;case 0x1a:getSrc();multiplication();break;case 0x1b:getSrc();division();break;case 0x1c:getSrc();modulous();break;case 0x1d:getSrc();divisionUnsigned();break;case 0x1e:getSrc();modulousUnsigned();break;case 0x1f:getSrc();visit();break;case 0x20:op=_4[(rCall+ret)>>2]>>>0;ret=(ret-4)>>>0;rParam=_4[(rCall+ret)>>2]>>>0;ret=(ret-4)>>>0;break;case 0x23:getSrc();convInt32();break;case 0x21:case 0x22:case 0x24:case 0x25:case 0x26:case 0x27:case 0x28:logv(cute&0xff);err(E_NOSUPPORT);case 0x29:f0=+time();setDst();break;case 0x2a:f0=+time();v0=~~(f0-delta);delta=f0;v1=v2=v3=0;setDst();break;default:err(E_INVALID);}}return 0;}function division(){var slot=0;var base=0;var size=0;size=(cute>>>8)&7;slot=(cute>>>16)&0xFF;if(cute&0x0800){switch((base=(cute>>12)&7)){case 0:if(ring)err(E_PERM);switch(slot|0){case 0x01:rHeap=((rHeap|0)/(v0|0))|0;return;case 0x02:rParam=((rParam|0)/(v0|0))|0;return;case 0x03:rText=((rText|0)/(v0|0))|0;return;case 0x04:rEntity=((rEntity|0)/(v0|0))|0;return;case 0x05:rCode=((rCode|0)/(v0|0))|0;return;case 0x06:rCall=((rCall|0)/(v0|0))|0;return;case 0x07:err(E_INVALID);case 0x08:err(E_INVALID);case 0x09:body=((body|0)/(v0|0))|0;return;case 0x0A:spine=((spine|0)/(v0|0))|0;return;case 0x0B:free=((free|0)/(v0|0))|0;return;case 0x0C:seed=((seed|0)/(v0|0))|0;return;case 0x0D:rSig=((rSig|0)/(v0|0))|0;return;case 0x0E:rVirt=((rVirt|0)/(v0|0))|0;return;case 0x0F:op=((op|0)/(v0|0))|0;return;default:err(E_INVALID);}case 1:base=rHeap;break;case 2:base=rParam;break;case 3:base=rText;break;case 4:base=rEntity;break;case 5:base=rCode;break;case 6:base=rCall;break;case 7:base=0;}base=(base+(_4[(rParam+slot)>>2]>>>0))>>>0;}else base=(rParam+slot)|0;switch(size|0){case 0:_1[base]=((_1[base]<<24)>>24)/((v0<<24)>>24);return;case 1:_2[base>>1]=((_2[base>>1]<<16)>>16)/((v0<<16)>>16);return;case 2:_4[base>>2]=((_4[base>>2]|0)/(v0|0))|0;return;case 3:case 4:err(E_NOSUPPORT);case 5:$f[base>>2]=$f[base>>2]/fround(f0);return;case 6:$d[base>>3]=$d[base>>3]/f0;return;case 7:default:err(E_NOSUPPORT);}}function divisionUnsigned(){var slot=0;var base=0;var size=0;size=(cute>>>8)&7;slot=(cute>>>16)&0xFF;if(cute&0x0800){switch((base=(cute>>12)&7)){case 0:if(ring)err(E_PERM);switch(slot|0){case 0x01:rHeap=((rHeap>>>0)/(v0>>>0))>>>0;return;case 0x02:rParam=((rParam>>>0)/(v0>>>0))>>>0;return;case 0x03:rText=((rText>>>0)/(v0>>>0))>>>0;return;case 0x04:rEntity=((rEntity>>>0)/(v0>>>0))>>>0;return;case 0x05:rCode=((rCode>>>0)/(v0>>>0))>>>0;return;case 0x06:rCall=((rCall>>>0)/(v0>>>0))>>>0;return;case 0x07:err(E_INVALID);case 0x08:err(E_INVALID);case 0x09:body=((body>>>0)/(v0>>>0))>>>0;return;case 0x0A:spine=((spine>>>0)/(v0>>>0))>>>0;return;case 0x0B:free=((free>>>0)/(v0>>>0))>>>0;return;case 0x0C:seed=((seed>>>0)/(v0>>>0))>>>0;return;case 0x0D:rSig=((rSig>>>0)/(v0>>>0))>>>0;return;case 0x0E:rVirt=((rVirt>>>0)/(v0>>>0))>>>0;return;case 0x0F:op=((op>>>0)/(v0>>>0))>>>0;return;default:err(E_INVALID);}case 1:base=rHeap;break;case 2:base=rParam;break;case 3:base=rText;break;case 4:base=rEntity;break;case 5:base=rCode;break;case 6:base=rCall;break;case 7:base=0;}base=(base+(_4[(rParam+slot)>>2]>>>0))>>>0;}else base=(rParam+slot)|0;switch(size|0){case 0:_1[base]=(_1[base]>>>0)/(v0>>>0);return;case 1:_2[base>>1]=(_2[base>>1]>>>0)/(v0>>>0);return;case 2:_4[base>>2]=(_4[base>>2]>>>0)/(v0>>>0);return;case 3:case 4:err(E_NOSUPPORT);case 5:case 6:case 7:err(E_NOSUPPORT);default:err(E_NOSUPPORT);}}function enhance(){var e0=0;var e1=0;var e2=0;var e3=0;var fc=0;e0=fing0;e1=fing1;e2=fing2;e3=fing3;v1=v2=v3=0;v0=fingerCnt;for(fc=64;(fc|0)>0;fc=(fc-1)|0)finger();v0=fing0;v1=fing1;v2=fing2;v3=fing3;fing0=e0;fing1=e1;fing2=e2;fing3=e3;}function err(e){e=e|0;lastError=e;dead=1;error(e|0);}function finger(){var r=0;r=v0;v0=(v0>>>7)|(v1<<25);v1=(v1>>>7)|(v2<<25);v2=(v2>>>7)|(v3<<25);v3=(v3>>>7)|(r<<25);fing0=((fing0&0x6487ED51)+fing2+(v0^0x10B4611A))|0;fing1=((fing1^0x62633145)+fing3+(v1^0xC06E0E68))|0;fing2=((fing2^0x94812704)+fing0+(v2^0x4533E63A))|0;fing3=((fing3&0x0105DF53)+fing1+(v3^0x1D89CD91))|0;v0=(fing1+fing3)|0;v1=(fing2+fing0)|0;v2=(fing3+fing2)|0;v3=(fing0+fing1)|0;r=v0;v0=(v0>>>15)|(v1<<17);v1=(v1>>>15)|(v2<<17);v2=(v2>>>15)|(v3<<17);v3=(v3>>>15)|(r<<17);fing0=((fing0&0x28A5043C)+fing2+(v0^0xC71A026E))|0;fing1=((fing1^0xF7CA8CD9)+fing3+(v1^0xE69D218D))|0;fing2=((fing2^0x98158536)+fing0+(v2^0xF92F8A1B))|0;fing3=((fing3&0xA7F09AB6)+fing1+(v3^0xB6A8E122))|0;v0=(fing1+fing3)|0;v1=(fing2+fing0)|0;v2=(fing3+fing2)|0;v3=(fing0+fing1)|0;r=v0;v0=(v0>>>21)|(v1<<11);v1=(v1>>>21)|(v2<<11);v2=(v2>>>21)|(v3<<11);v3=(v3>>>21)|(r<<11);fing0=((fing0&0xF242DABB)+fing2+(v0^0x312F3F63))|0;fing1=((fing1^0x7A262174)+fing3+(v1^0xD31BF6B5))|0;fing2=((fing2^0x85FFAE5B)+fing0+(v2^0x7A035BF6))|0;fing3=((fing3&0xF71C35FD)+fing1+(v3^0xAD44CFD2))|0;v0=(fing1+fing3)|0;v1=(fing2+fing0)|0;v2=(fing3+fing2)|0;v3=(fing0+fing1)|0;}function getSrc(){v0=(cute>>>24)|0;if(cute&0x8000){switch((cute>>>8)&7){case 0:return;case 1:v0=_2[op>>1]|0;op=(op+4)|0;return;case 2:if(v0){if(ring)err(E_PERM);switch(v0|0){case 0x01:v0=rHeap;return;case 0x02:v0=rParam;return;case 0x03:v0=rText;return;case 0x04:v0=rEntity;return;case 0x05:v0=rCode;return;case 0x06:v0=rCall;return;case 0x07:v0=(ring<<2)|cmp;return;case 0x08:err(E_INVALID);case 0x09:v0=body;return;case 0x0A:v0=spine;return;case 0x0B:v0=free;return;case 0x0C:v0=seed;return;case 0x0D:v0=rSig;return;case 0x0E:v0=rVirt;return;case 0x0F:v0=(op-rCode)|0;return;default:}err(E_INVALID);}v0=_4[op>>2]|0;op=(op+4)|0;return;case 7:case 4:v0=_4[op>>2]|0;v1=_4[(op+4)>>2]|0;v2=_4[(op+8)>>2]|0;v3=_4[(op+12)>>2]|0;op=(op+16)|0;return;case 3:v0=_4[op>>2]|0;v1=_4[(op+4)>>2]|0;op=(op+8)|0;return;case 5:f0=+$f[op>>2];op=(op+4)|0;return;case 6:f0=+$d[(op=(op+7)|0)>>3];op=((op&0xfffffff8)+8)|0;return;default:}}if((cute&0x0800)==0){switch((cute>>12)&7){case 0:v0=(rParam+v0)>>>0;break;case 1:v0=((_4[(rParam+v0)>>2]>>>0)+rHeap)>>>0;break;case 2:v0=((_4[(rParam+v0)>>2]>>>0)+rParam)>>>0;break;case 3:v0=((_4[(rParam+v0)>>2]>>>0)+rText)>>>0;break;case 4:v0=((_4[(rParam+v0)>>2]>>>0)+rEntity)>>>0;break;case 5:v0=((_4[(rParam+v0)>>2]>>>0)+rCode)>>>0;break;case 6:v0=((_4[(rParam+v0)>>2]>>>0)+rCall)>>>0;break;case 7:v0=_4[(rParam+v0)>>2]>>>0;break;}}else{v0=(rParam+v0)>>>0;}switch((cute>>>8)&7){case 4:case 7:v3=_4[(v0+12)>>2]>>>0;v2=_4[(v0+8)>>2]>>>0;case 3:v1=_4[(v0+4)>>2]>>>0;case 2:v0=_4[v0>>2]>>>0;break;case 1:v0=_2[v0>>1]>>>0;break;case 0:v0=_1[v0]>>>0;break;case 5:f0=+$f[v0>>2];break;case 6:f0=+$d[v0>>3];default:}}function $_getRing(){return ring|0;}function grow(max){max=max|0;var pos=0;var mem=0;var next=0;if(((spine+0x1fff)|0)>(max|0)|((spine+(max>>>10))|0)>(max|0)){body=max;err(E_NOMEM);}max=(max&0xffffe000);next=free;for(pos=max;(pos|0)>(body|0);pos=(pos-0x2000)|0){mem=pos>>>10;_4[(spine+mem)>>2]=0x0e02;_4[(spine+mem+4)>>2]=0x0c03;next=mem;}free=mem;body=max;}function halt(){dead=1;err(E_HALT);}function $_halt(){dead=1;err(E_HALT);}function $_init(max,pos,arg,k0,k1,k2,k3){max=max|0;pos=pos|0;arg=arg|0;k0=k0|0;k1=k1|0;k2=k2|0;k3=k3|0;if(ini)err(E_INVALID);spine=0;body=max;if((lock0=k0)|(lock1=k1)|(lock2=k2)|(lock3=k3))ring=1;else ring=0;rParam=arg;rCode=pos;op=rCode;ret=0;ini=1;dead=0;born=+time();return 0;}function modulous(){var slot=0;var base=0;var size=0;size=(cute>>>8)&7;slot=(cute>>>16)&0xFF;if(cute&0x0800){switch((base=(cute>>12)&7)){case 0:if(ring)err(E_PERM);switch(slot|0){case 0x01:rHeap=((rHeap|0)%(v0|0))|0;return;case 0x02:rParam=((rParam|0)%(v0|0))|0;return;case 0x03:rText=((rText|0)%(v0|0))|0;return;case 0x04:rEntity=((rEntity|0)%(v0|0))|0;return;case 0x05:rCode=((rCode|0)%(v0|0))|0;return;case 0x06:rCall=((rCall|0)%(v0|0))|0;return;case 0x07:err(E_INVALID);case 0x08:err(E_INVALID);case 0x09:body=((body|0)%(v0|0))|0;return;case 0x0A:spine=((spine|0)%(v0|0))|0;return;case 0x0B:free=((free|0)%(v0|0))|0;return;case 0x0C:seed=((seed|0)%(v0|0))|0;return;case 0x0D:rSig=((rSig|0)%(v0|0))|0;return;case 0x0E:rVirt=((rVirt|0)%(v0|0))|0;return;case 0x0F:op=((op|0)%(v0|0))|0;return;default:err(E_INVALID);}case 1:base=rHeap;break;case 2:base=rParam;break;case 3:base=rText;break;case 4:base=rEntity;break;case 5:base=rCode;break;case 6:base=rCall;break;case 7:base=0;}base=(base+(_4[(rParam+slot)>>2]>>>0))>>>0;}else base=(rParam+slot)|0;switch(size|0){case 0:_1[base]=((_1[base]<<24)>>24)%((v0<<24)>>24);return;case 1:_2[base>>1]=((_2[base>>1]<<16)>>16)%((v0<<16)>>16);return;case 2:_4[base>>2]=((_4[base>>2]|0)%(v0|0))|0;return;case 3:case 4:err(E_NOSUPPORT);case 5:$f[base>>2]=fround((+$f[base>>2])%f0);return;case 6:$d[base>>3]=$d[base>>3]%f0;return;case 7:default:err(E_NOSUPPORT);}}function modulousUnsigned(){var slot=0;var base=0;var size=0;size=(cute>>>8)&7;slot=(cute>>>16)&0xFF;if(cute&0x0800){switch((base=(cute>>12)&7)){case 0:if(ring)err(E_PERM);switch(slot|0){case 0x01:rHeap=((rHeap>>>0)%(v0>>>0))>>>0;return;case 0x02:rParam=((rParam>>>0)%(v0>>>0))>>>0;return;case 0x03:rText=((rText>>>0)%(v0>>>0))>>>0;return;case 0x04:rEntity=((rEntity>>>0)%(v0>>>0))>>>0;return;case 0x05:rCode=((rCode>>>0)%(v0>>>0))>>>0;return;case 0x06:rCall=((rCall>>>0)%(v0>>>0))>>>0;return;case 0x07:err(E_INVALID);case 0x08:err(E_INVALID);case 0x09:body=((body>>>0)%(v0>>>0))>>>0;return;case 0x0A:spine=((spine>>>0)%(v0>>>0))>>>0;return;case 0x0B:free=((free>>>0)%(v0>>>0))>>>0;return;case 0x0C:seed=((seed>>>0)%(v0>>>0))>>>0;return;case 0x0D:rSig=((rSig>>>0)%(v0>>>0))>>>0;return;case 0x0E:rVirt=((rVirt>>>0)%(v0>>>0))>>>0;return;case 0x0F:op=((op>>>0)%(v0>>>0))>>>0;return;default:err(E_INVALID);}case 1:base=rHeap;break;case 2:base=rParam;break;case 3:base=rText;break;case 4:base=rEntity;break;case 5:base=rCode;break;case 6:base=rCall;break;case 7:base=0;}base=(base+(_4[(rParam+slot)>>2]>>>0))>>>0;}else base=(rParam+slot)|0;switch(size|0){case 0:_1[base]=(_1[base]>>>0)%(v0>>>0);return;case 1:_2[base>>1]=(_2[base>>1]>>>0)%(v0>>>0);return;case 2:_4[base>>2]=(_4[base>>2]>>>0)%(v0>>>0);return;case 3:case 4:err(E_NOSUPPORT);case 5:case 6:case 7:err(E_NOSUPPORT);default:err(E_NOSUPPORT);}}function multiplication(){var slot=0;var base=0;var size=0;var f=0.0;var v4=0;var v5=0;var v6=0;var v7=0;var x0=0;var x1=0;var x2=0;var x3=0;var x4=0;var x5=0;var x6=0;var x7=0;var r0=0;var r1=0;var r2=0;var r3=0;var r4=0;var r5=0;var r6=0;var r7=0;size=(cute>>>8)&7;slot=(cute>>>16)&0xFF;if(cute&0x0800){switch((base=(cute>>12)&7)){case 0:if(ring)err(E_PERM);switch(slot|0){case 0x01:rHeap=imul(rHeap|0,v0|0)|0;return;case 0x02:rParam=imul(rParam|0,v0|0)|0;return;case 0x03:rText=imul(rText|0,v0|0)|0;return;case 0x04:rEntity=imul(rEntity|0,v0|0)|0;return;case 0x05:rCode=imul(rCode|0,v0|0)|0;return;case 0x06:rCall=imul(rCall|0,v0|0)|0;return;case 0x07:err(E_INVALID);case 0x08:err(E_INVALID);case 0x09:body=imul(body|0,v0|0)|0;return;case 0x0A:spine=imul(spine|0,v0|0)|0;return;case 0x0B:free=imul(free|0,v0|0)|0;return;case 0x0C:seed=imul(seed|0,v0|0)|0;return;case 0x0D:rSig=imul(rSig|0,v0|0)|0;return;case 0x0E:rVirt=imul(rVirt|0,v0|0)|0;return;case 0x0F:op=imul(op|0,v0|0)|0;return;default:err(E_INVALID);}case 1:base=rHeap;break;case 2:base=rParam;break;case 3:base=rText;break;case 4:base=rEntity;break;case 5:base=rCode;break;case 6:base=rCall;break;case 7:base=0;}base=(base+(_4[(rParam+slot)>>2]>>>0))>>>0;}else base=(rParam+slot)|0;switch(size|0){case 0:_1[base]=imul(_1[base]|0,v0|0)|0;return;case 1:_2[base>>1]=imul(_2[base>>1]|0,v0|0)|0;return;case 2:_4[base>>2]=imul(_4[base>>2]|0,v0|0)|0;return;case 3:v3=(v1>>>16);v2=(v1&0xffff);v1=(v0>>>16);v0=(v0&0xffff);x0=(x1=_4[base>>2]>>>0)&0xffff;x1=x1>>>16;x2=(x3=_4[(base+4)>>2]>>>0)&0xffff;x3=x3>>>16;r0=imul(v0|0,x0|0)|0;slot=r0&0xffff;size=r0>>>16;r0=imul(v1|0,x0|0)|0;r1=imul(v0|0,x1|0)|0;size=((r0&0xffff)+(r1&0xffff)+size)>>>0;_4[base>>2]=(size<<16)|slot;size=((size>>>16)+(r0>>>16)+(r1>>>16))>>>0;r0=imul(v2|0,x0|0)|0;r1=imul(v1|0,x1|0)|0;r2=imul(v0|0,x2|0)|0;size=((r0&0xffff)+(r1&0xffff)+(r2&0xffff)+size)>>>0;slot=size&0xffff;size=((size>>>16)+(r0>>>16)+(r1>>>16)+(r2>>>16))>>>0;r0=imul(v3|0,x0|0)|0;r1=imul(v2|0,x1|0)|0;r2=imul(v1|0,x2|0)|0;r3=imul(v0|0,x3|0)|0;size=((r0&0xffff)+(r1&0xffff)+(r2&0xffff)+(r3&0xffff)+size)>>>0;_4[(base+4)>>2]=(size<<16)|slot;return;case 4:v7=v3>>>16;v6=v3&0xffff;v5=v2>>>16;v4=v2&0xffff;v3=v1>>>16;v2=v1&0xffff;v1=v0>>>16;v0=v0&0xffff;x0=(x1=_4[base>>2]|0)&0xffff;x1=x1>>>16;x2=(x3=_4[(base+4)>>2]|0)&0xffff;x3=x3>>>16;x4=(x5=_4[(base+8)>>2]|0)&0xffff;x5=x5>>>16;x6=(x7=_4[(base+12)>>2]|0)&0xffff;x7=x7>>>16;r0=imul(v0|0,x0|0)|0;slot=r0&0xffff;size=r0>>>16;r0=imul(v1|0,x0|0)|0;r1=imul(v0|0,x1|0)|0;size=((r0&0xffff)+(r1&0xffff)+size)>>>0;_4[base>>2]=(size<<16)|slot;size=((size>>>16)+(r0>>>16)+(r1>>>16))>>>0;r0=imul(v2|0,x0|0)|0;r1=imul(v1|0,x1|0)|0;r2=imul(v0|0,x2|0)|0;size=((r0&0xffff)+(r1&0xffff)+(r2&0xffff)+size)>>>0;slot=size&0xffff;size=((size>>>16)+(r0>>>16)+(r1>>>16)+(r2>>>16))>>>0;r0=imul(v3|0,x0|0)|0;r1=imul(v2|0,x1|0)|0;r2=imul(v1|0,x2|0)|0;r3=imul(v0|0,x3|0)|0;size=((r0&0xffff)+(r1&0xffff)+(r2&0xffff)+(r3&0xffff)+size)>>>0;_4[(base+4)>>2]=(size<<16)|slot;size=((size>>>16)+(r0>>>16)+(r1>>>16)+(r2>>>16)+(r3>>>16))>>>0;r0=imul(v4|0,x0|0)|0;r1=imul(v3|0,x1|0)|0;r2=imul(v2|0,x2|0)|0;r3=imul(v1|0,x3|0)|0;r4=imul(v0|0,x4|0)|0;size=((r0&0xffff)+(r1&0xffff)+(r2&0xffff)+(r3&0xffff)+(r4&0xffff)+size)>>>0;slot=size&0xffff;size=((size>>>16)+(r0>>>16)+(r1>>>16)+(r2>>>16)+(r3>>>16)+(r4>>>16))>>>0;r0=imul(v5|0,x0|0)|0;r1=imul(v4|0,x1|0)|0;r2=imul(v3|0,x2|0)|0;r3=imul(v2|0,x3|0)|0;r4=imul(v1|0,x4|0)|0;r5=imul(v0|0,x5|0)|0;size=((r0&0xffff)+(r1&0xffff)+(r2&0xffff)+(r3&0xffff)+(r4&0xffff)+(r5&0xffff)+size)>>>0;_4[(base+8)>>2]=(size<<16)|slot;size=((size>>>16)+(r0>>>16)+(r1>>>16)+(r2>>>16)+(r3>>>16)+(r4>>>16)+(r5>>>16))>>>0;r0=imul(v6|0,x0|0)|0;r1=imul(v5|0,x1|0)|0;r2=imul(v4|0,x2|0)|0;r3=imul(v3|0,x3|0)|0;r4=imul(v2|0,x4|0)|0;r5=imul(v1|0,x5|0)|0;r6=imul(v0|0,x6|0)|0;size=((r0&0xffff)+(r1&0xffff)+(r2&0xffff)+(r3&0xffff)+(r4&0xffff)+(r5&0xffff)+(r6&0xffff)+size)>>>0;slot=size&0xffff;size=((size>>>16)+(r0>>>16)+(r1>>>16)+(r2>>>16)+(r3>>>16)+(r4>>>16)+(r5>>>16)+(r6>>>16))>>>0;r0=imul(v7|0,x0|0)|0;r1=imul(v6|0,x1|0)|0;r2=imul(v5|0,x2|0)|0;r3=imul(v4|0,x3|0)|0;r4=imul(v3|0,x4|0)|0;r5=imul(v2|0,x5|0)|0;r6=imul(v1|0,x6|0)|0;r7=imul(v0|0,x7|0)|0;size=((r0&0xffff)+(r1&0xffff)+(r2&0xffff)+(r3&0xffff)+(r4&0xffff)+(r5&0xffff)+(r6&0xffff)+(r7&0xffff)+size)>>>0;_4[(base+12)>>2]=(size<<16)|slot;return;case 5:$f[base>>2]=fround(+$f[base>>2]*f0);return;case 6:$d[base>>3]=$d[base>>3]*f0;return;case 7:default:err(E_NOSUPPORT);}}function negate(){var slot=0;var base=0;var size=0;size=(cute>>>8)&7;slot=(cute>>>16)&0xFF;if(cute&0x0800){switch((base=(cute>>12)&7)){case 0:if(ring)err(E_PERM);switch(slot|0){case 0x01:rHeap=(-v0)|0;return;case 0x02:rParam=(-v0)|0;return;case 0x03:rText=(-v0)|0;return;case 0x04:rEntity=(-v0)|0;return;case 0x05:rCode=(-v0)|0;return;case 0x06:rCall=(-v0)|0;return;case 0x07:err(E_INVALID);case 0x08:err(E_INVALID);case 0x09:body=(-v0)|0;return;case 0x0A:spine=(-v0)|0;return;case 0x0B:free=(-v0)|0;return;case 0x0C:seed=(-v0)|0;return;case 0x0D:rSig=(-v0)|0;return;case 0x0E:rVirt=(-v0)|0;return;case 0x0F:op=(-v0)|0;return;default:err(E_INVALID);}case 1:base=rHeap;break;case 2:base=rParam;break;case 3:base=rText;break;case 4:base=rEntity;break;case 5:base=rCode;break;case 6:base=rCall;break;case 7:base=0;}base=(base+(_4[(rParam+slot)>>2]>>>0))>>>0;}else base=(rParam+slot)|0;switch(size|0){case 0:_1[base]=(-v0)|0;return;case 1:_2[base>>1]=(-v0)|0;return;case 2:_4[base>>2]=(-v0)|0;return;case 3:_4[base>>2]=slot=((size=(~v0)|0)+1)|0;base=(base+4)|0;if((slot>>>0)<(size>>>0))_4[base>>2]=((~v1)+1)|0;else _4[base>>2]=~v1;return;case 4:_4[base>>2]=slot=((size=(~v0)|0)+1)|0;if((slot>>>0)<(size>>>0)){_4[(base+4)>>2]=slot=((size=(~v1)|0)+1)|0;if((slot>>>0)<(size>>>0)){_4[(base+8)>>2]=slot=((size=(~v2)|0)+1)|0;if((slot>>>0)<(size>>>0))_4[(base+12)>>2]=((~v3)+1)|0;else _4[(base+12)>>2]=~v3;}else{_4[(base+8)>>2]=~v2;_4[(base+12)>>2]=~v3;}}else{_4[(base+4)>>2]=~v1;_4[(base+8)>>2]=~v2;_4[(base+12)>>2]=~v3;}return;case 5:$f[base>>2]=fround(-f0);return;case 6:$d[base>>3]=-f0;return;case 7:default:err(E_NOSUPPORT);}}function notRoot(){if(dead)return 1;if(ring)err(E_PERM);return 0;}function $_reset(){if(ring)err(E_PERM);}function setDst(){var slot=0;var base=0;var size=0;size=(cute>>>8)&7;slot=(cute>>>16)&0xFF;if(cute&0x0800){switch((base=(cute>>12)&7)){case 0:if(ring)err(E_PERM);switch(slot|0){case 0x00:return;case 0x01:rHeap=v0;return;case 0x02:rParam=v0;return;case 0x03:rText=v0;return;case 0x04:rEntity=v0;return;case 0x05:rCode=v0;return;case 0x06:rCall=v0;return;case 0x07:ring=(v0>>>2)&1;cmp=0x80000003&v0;return;case 0x08:err(E_INVALID);return;case 0x09:body=v0;return;case 0x0A:spine=v0;return;case 0x0B:free=v0;return;case 0x0C:seed=v0;return;case 0x0D:rSig=v0;return;case 0x0E:rVirt=v0;return;case 0x0F:op=(v0+rCode)|0;return;default:}err(E_INVALID);case 1:base=rHeap;break;case 2:base=rParam;break;case 3:base=rText;break;case 4:base=rEntity;break;case 5:base=rCode;break;case 6:base=rCall;break;case 7:base=0;}base=(base+(_4[(rParam+slot)>>2]>>>0))>>>0;}else{base=(rParam+slot)>>>0;}switch(size|0){case 0:_1[base]=v0>>>0;return;case 1:_2[base>>1]=v0>>>0;return;case 4:case 7:_4[(base+12)>>2]=v3>>>0;_4[(base+8)>>2]=v2>>>0;case 3:_4[(base+4)>>2]=v1>>>0;case 2:_4[base>>2]=v0>>>0;return;case 5:$f[base>>2]=f0;return;case 6:$d[base>>3]=f0;return;default:}}function $_setRing(which){which=which|0;if(dead)err(E_INVALID);if((ring|0)>(which&1)){enhance();if(((lock0|0)!=(v0|0))|((lock1|0)!=(v1|0))|((lock2|0)!=(v2|0))|((lock3|0)!=(v3|0)))err(E_PERM);}ring=which&1;}function signExtend(){var slot=0;var base=0;var size=0;var x0=0;var x1=0;var x2=0;var x3=0;size=(cute>>>8)&7;slot=(cute>>>16)&0xFF;if(cute&0x0800){switch((base=(cute>>12)&7)){case 0:if(ring)err(E_PERM);switch(slot|0){case 0x01:rHeap=(v0<<16)>>16;return;case 0x02:rParam=(v0<<16)>>16;return;case 0x03:rText=(v0<<16)>>16;return;case 0x04:rEntity=(v0<<16)>>16;return;case 0x05:rCode=(v0<<16)>>16;return;case 0x06:rCall=(v0<<16)>>16;return;case 0x07:err(E_INVALID);case 0x08:err(E_INVALID);case 0x09:body=(v0<<16)>>16;return;case 0x0A:spine=(v0<<16)>>16;return;case 0x0B:free=(v0<<16)>>16;return;case 0x0C:seed=(v0<<16)>>16;return;case 0x0D:rSig=(v0<<16)>>16;return;case 0x0E:rVirt=(v0<<16)>>16;return;case 0x0F:op=(v0<<16)>>16;return;default:err(E_INVALID);}case 1:base=rHeap;break;case 2:base=rParam;break;case 3:base=rText;break;case 4:base=rEntity;break;case 5:base=rCode;break;case 6:base=rCall;break;case 7:base=0;}base=(base+(_4[(rParam+slot)>>2]>>>0))>>>0;}else base=(rParam+slot)|0;switch(size|0){case 0:_1[base]=(v0<<28)>>28;return;case 1:_2[base>>1]=(v0<<24)>>24;return;case 2:_4[base>>2]=(v0<<16)>>16;return;case 3:_4[base>>2]=v0;_4[(base+4)>>2]=v0>>31;return;case 4:_4[base>>2]=v0;_4[(base+4)>>2]=v1;_4[(base+8)>>2]=_4[(base+12)>>2]=v1>>31;return;default:err(E_NOSUPPORT);}}function subtraction(){var slot=0;var base=0;var size=0;var f=0.0;var x0=0;var x1=0;var x2=0;var x3=0;size=(cute>>>8)&7;slot=(cute>>>16)&0xFF;if(cute&0x0800){switch((base=(cute>>12)&7)){case 0:if(ring)err(E_PERM);switch(slot|0){case 0x01:rHeap=(rHeap-v0)|0;return;case 0x02:rParam=(rParam-v0)|0;return;case 0x03:rText=(rText-v0)|0;return;case 0x04:rEntity=(rEntity-v0)|0;return;case 0x05:rCode=(rCode-v0)|0;return;case 0x06:rCall=(rCall-v0)|0;return;case 0x07:err(E_INVALID);case 0x08:err(E_INVALID);case 0x09:body=(body-v0)|0;return;case 0x0A:spine=(spine-v0)|0;return;case 0x0B:free=(free-v0)|0;return;case 0x0C:seed=(seed-v0)|0;return;case 0x0D:rSig=(rSig-v0)|0;return;case 0x0E:rVirt=(rVirt-v0)|0;return;case 0x0F:op=(op-v0)|0;return;default:err(E_INVALID);}case 1:base=rHeap;break;case 2:base=rParam;break;case 3:base=rText;break;case 4:base=rEntity;break;case 5:base=rCode;break;case 6:base=rCall;break;case 7:base=0;}base=(base+(_4[(rParam+slot)>>2]>>>0))>>>0;}else base=(rParam+slot)|0;switch(size|0){case 0:_1[base]=(_1[base]>>>0)-v0;return;case 1:_2[base>>1]=(_2[base>>1]>>>0)-v0;return;case 2:_4[base>>2]=(_4[base>>2]>>>0)-v0;return;case 3:slot=(_4[base>>2]=(size=_4[base>>2]|0)-v0)|0;base=(base+4)|0;if((slot>>>0)>(size>>>0))_4[base>>2]=(_4[base>>2]|0)-v1-1;else _4[base>>2]=(_4[base>>2]|0)-v1;return;case 4:x0=_4[base>>2]>>>0;x1=_4[(base+4)>>2]>>>0;x2=_4[(base+8)>>2]>>>0;x3=_4[(base+12)>>2]>>>0;_4[base>>2]=slot=(x0-v0)|0;if((slot>>>0)>(x0>>>0)){x1=((slot=x1)-1)|0;if((x1>>>0)>(slot>>>0)){x2=((slot=x2)-1)|0;if((x2>>>0)>(slot>>>0))x3=(x3-1)|0;}}_4[(base+4)>>2]=slot=(x1-v1)|0;if((slot>>>0)>(x1>>>0)){x2=((slot=x2)-1)|0;if((x2>>>0)>(slot>>>0))x3=(x3-1)|0;}_4[(base+8)>>2]=slot=(x2-v2)|0;if((slot>>>0)>(x2>>>0))x3=(x3-1)|0;_4[(base+12)>>2]=(x3-v3)|0;return;case 5:$f[base>>2]=$f[base>>2]-fround(f0);return;case 6:$d[base>>3]=$d[base>>3]-f0;return;case 7:default:err(E_NOSUPPORT);}}function visit(){var adj=0;adj=(cute>>>14)&0x3Fc;ret=(ret+4)>>>0;_4[(rCall+ret)>>2]=rParam;ret=(ret+4)>>>0;_4[(rCall+ret)>>2]=op;rParam=(rParam+adj)>>>0;op=(rCode+v0)>>>0;}return{attrib:$_attrib,cls:$_cls,crash:$_crash,cycle:$_cycle,getRing:$_getRing,halt:$_halt,init:$_init,setRing:$_setRing};";
new function() {
    function h(a) {
        this.data = null;
        this.direct = !1;
        this.size = this.pos = this.id = this.host = null;
        0 < arguments.length && (this.data = a.data, this.direct = a.direct, this.host = a.host, this.id = a.id, this.pos = a.pos, this.size = a.size)
    }

    function g() {
        this.skull = this.id = null;
        this.bind = function(a, e) {
            return null
        };
        this.connect = function(a, e, c) {
            k.log("sc.connect( " + a + ", " + e + ", " + c + " )");
            return !0
        }
    }
    var k = System,
        f = M;
    M = "";
    k.Protocol = h;
    k.Machine = g;
    Math.imul || (Math.imul = function(a, e) {
        var c = a & 65535,
            b = e & 65535;
        return c * b + ((a >>> 16 & 65535) * b + c * (e >>> 16 & 65535) << 16 >>> 0) | 0
    });
    Math.fround || (Math.fround = function() {
        var a = new Float32Array(1);
        return function(e) {
            a[0] = +e;
            return a[0]
        }
    }());
    k.Environment = function() {
        function a(a) {
            if ("number" != typeof a) try {
                return a.toString()
            } catch (b) {
                a = v
            }
            a |= 0;
            return 0 > a || a >= m.length ? "Unknown Error." : m[a]
        }

        function e(a) {
            throw a >>> 0;
        }

        function c() {
            var a;
            do a = (+new Date ^ 65536 * Math.random() ^ 65536 * Math.random() << 16) >>> 0 | 0; while (void 0 !== w[a]);
            return a
        }

        function b() {
            var a;
            do a = (+new Date ^ 65536 * Math.random() ^ 65536 * Math.random() << 16) >>> 0 | 0; while (void 0 !== C[a]);
            return a
        }

        function l(b) {
            if ("number" == typeof b) return 0 < b ? (k.log("sc error " + b + ", 0x" + b.toString(16) + ": " + a(b)), b) : b - 1;
            k.log("sc error ?: " + a(b));
            k.log(b);
            return A
        }

        function n(a) {
            k.log("sc.logs: " + a)
        }

        function d(a) {
            k.log("sc.logv: " + (a >>> 0).toString(16) + " : " + a)
        }

        function p(a) {
            a |= 0;
            0 > a && (a = 0);
            throw -a;
        }

        function r() {
            return Date.now()
        }

        function u(a) {
            this.inherit = g;
            this.inherit();
            a = (a | 0) >>> 13;
            ++D;
            this.id = c();
            a <<= 13;
            var b = new ArrayBuffer(a);
            new Uint8Array(b);
            var l = new Uint32Array(b);
            this.connect = function(a, b, d) {
                return !1
            };
            this.bind = function(a, b) {
                return l.subarray(a >> 2, (a >> 2) + (b >> 2))
            };
            this.brain = (new Function("std", "foriegn", "heap", f))(window, {
                error: e,
                imul: Math.imul,
                logs: n,
                logv: d,
                wait: p,
                time: r
            }, b);
            this.size = a;
            this.heap = b
        }
        var v = 6,
            A = 7,
            m = "OK.;Permission Required.;Out of memory.;Invalid operation.;Invalid memory access.;Invalid access alignment.;Unknown error.;Host environment exception.;Halted.;Operation not supported.".split(";"),
            s = void 0;
        this.LSB = s;
        var D = 0,
            w = [],
            C = [];
        this.explain = a;
        this.cycle = function(a, b) {
            try {
                return w[a].brain.cycle(b | 0)
            } catch (d) {
                return l(d)
            }
        };
        this.init = function(a, b, d, c, e, f, g) {
            try {
                w[a].brain.init(w[a].size - 1, b, d, c, e, f, g)
            } catch (h) {
                return l(h)
            }
        };
        this.load = function(b, d, c) {
            try {
                if ("string" == typeof d) throw a(9);
                var e = w[b].bind(c, d.length << 2);
                for (b = 0; b < d.length && b < e.length; ++b) e[b] = d[b];
                k.log("Loaded " + b + " words.")
            } catch (f) {
                return l(f)
            }
        };
        Date.now || (Date.now = function() {
            return (new Date).getTime()
        });
        try {
            s = function() {
                var a = new ArrayBuffer(4);
                (new DataView(a)).setUint32(0, 1718303319, !0);
                switch ((new Int32Array(a))[0]) {
                    case 1463446374:
                        return !1;
                    case 1718303319:
                        return !0;
                    default:
                        return null
                }
            }()
        } catch (y) {
            k.log("sc: can't test LSB: " + y)
        }
        this.LSB = s;
        this.build = function(a) {
            a = new u(a);
            if (!a) throw 3;
            w[a.id] = a;
            return a.id
        };
        this.dump = function(a) {
            return w[a].heap
        };
        this.support = function(a) {
            var d = new h(a);
            d.id = b();
            C[d.id] = d;
            return a.id = d.id
        };
        this.register = function(a) {
            var b = c();
            w[b] = a;
            return b
        };
        this.connect = function(a, d, c) {
            var e = w[a];
            c = w[c];
            var f = C[d];
            if (!e || !c || !f) throw 3;
            try {
                if (f = new h(f), f.host = e, f.client = c, f.data = e.bind(f.pos, f.size), f.id = b(), f.direct) try {
                    C[f.id] = f, c.connect(a, d, f.data)
                } catch (g) {
                    throw delete C[f.id], A;
                } else C[f.id] = f
            } catch (l) {
                throw A;
            }
            return f.id
        }
    }
};
new function() {
    var h = System,
        g = "#000 #00a #0a0 #0aa #a00 #a0a #a50 #aaa #555 #55f #5f5 #5ff #f55 #f5f #ff5 #fff".split(" "),
        k = "#000000 #000084 #008400 #008080 #840000 #800080 #804000 #808080 #404040 #4040ff #38ff38 #40ffff #ff4040 #ff40ff #ffff40 #ffffff".split(" "),
        f = "#000000 #000099 #009900 #009292 #9b0000 #940094 #964b00 #939393 #4b4b4b #4c4ce0 #39e339 #40e2df #e34b4b #e34ae3 #e0e048 #e2e2e2".split(" ");
    h.InputDevice = function(a) {
        function e(b) {
            c[g] = (b.shiftPressed ? 1 : 0) | (b.ctrlPressed ? 2 : 0) | (b.altPressed ? 4 : 0);
            a(-1)
        }
        this.inherit = h.Phase;
        this.inherit();
        this.inherit = h.Machine;
        this.inherit();
        var c = null,
            b = !1,
            f = 1,
            g = 2;
        this.setScale = function(a) {
            f = 0 + a
        };
        this.mouseMove = function(a) {
            c[5] = a.mousePos.x * f;
            c[6] = a.mousePos.y * f;
            c[9] += a.mouseMov.x * f;
            c[10] += a.mouseMov.y * f;
            c[0] |= 1;
            e(a)
        };
        this.mousePress = function(a) {
            c[7] = a.mouseButton;
            c[0] |= 2;
            e(a)
        };
        this.mouseRelease = function(a) {
            c[7] = a.mouseButton;
            c[0] |= 4;
            e(a)
        };
        this.mouseWheel = function(a) {
            c[8] = a.mouseWheel | 0;
            c[0] |= 8;
            e(a)
        };
        this.keyPress = function(a) {
            c[0] |= 16;
            c[3] = a.keyCode;
            e(a)
        };
        this.keyRelease = function(a) {
            c[3] = a.keyCode;
            c[0] |= 32;
            e(a)
        };
        this.charTyped = function(a) {
            c[0] |= 64;
            c[4] = a.charCode;
            e(a)
        };
        this.begin = function() {};
        this.end = function() {};
        this.update = function(b) {
            a(b);
            return !0
        };
        this.connect = function(a, e, f) {
            if (b) return !1;
            c = f;
            return b = !0
        }
    };
    h.TextDisplay = function(a, e, c, b, l) {
        function n(a, b) {
            var c = b.length;
            if (null == N) {
                N = Array(c);
                for (var d = c; 0 <= --d;) N[d] = document.createElement("canvas")
            }
            for (d = c; 0 <= --d;) canvas = N[d], canvas.width = a.width, canvas.height = a.height, c = canvas.getContext("2d"), c.globalAlpha = 1, c.globalCompositeOperation = "source-over", c.drawImage(a, 0, 0), c.globalCompositeOperation = "source-atop", c.fillStyle = b[d], c.fillRect(0, 0, canvas.width, canvas.height)
        }
        var d = this;
        d.inherit = h.Machine;
        d.inherit();
        l = l ? !0 : !1;
        b |= 0;
        e |= 0;
        c |= 0;
        var p = e * b,
            r = c * b;
        a.width = p;
        a.height = r;
        var u = null,
            v = 0,
            A = 0,
            m = a.getContext("2d"),
            s = m,
            D = 1 < b && l ? k : g;
        1 < b && (u = document.createElement("canvas"), u.width = e, u.height = c, s = u.getContext("2d"), u.ctx = s);
        s.fillStyle = D[0];
        s.fillRect(0, 0, e, c);
        var w = Math.floor(e / 9),
            C = c >>> 4,
            y = C * w,
            G = 4,
            T = G + (y >> 1) - 1,
            y = new ArrayBuffer(y << 2),
            R = new Uint32Array(y),
            U = !1,
            q = 0,
            H, L, I, J, U = !1,
            E = 0,
            B = null,
            Z = !1,
            F, V, W, Q;
        d.connect = function(a, b, c) {
            if (Z) return !1;
            B = c;
            V = +new Date;
            W = 666;
            Q = 0;
            F = !1;
            G = 4;
            L = 13;
            H = 1;
            I = 7;
            J = 2;
            E = 0;
            q = E << 16 | H << 12 | L << 8 | I << 4 | J | 134217728;
            l && (q |= 268435456);
            B[0] = q;
            B[2] = C << 16 | w;
            B[1] = 0;
            B[3] = G;
            return Z = !0
        };
        d.setScanLines = function(a) {
            l = a ? !0 : !1;
            n(K[1], l ? k : g);
            l && 1 < b ? (viewport.parentElement.style.backgroundColor = f[E], D = k) : (viewport.parentElement.style.backgroundColor = g[E], D = g);
            s = 1 < b ? u.ctx : m;
            for (a = 0; a < R.length; ++a) R[a] = 0
        };
        d.render = function() {
            if (U) {
                h.scaleSmoothing(s, !1);
                q = B[0];
                0 == (q & 2147483648) && (B[0] = q |= 2147483648, B[2] = C << 16 | w);
                var k = B[1],
                    n = k >>> 16 & 65535,
                    k = k & 65535;
                if (0 == (q & 134217728)) F && (q |= 536870912), F = !1;
                else if (W) {
                    var t = +new Date;
                    Q += t - V;
                    Q >= W && (Q = 0, F = !F, q |= 536870912);
                    V = t
                } else F || (q |= 536870912), F = !0;
                if (0 != (q & 1610612736)) {
                    q &= -536870913;
                    t = q >>> 16 & 15;
                    H = q >>> 12 & 15;
                    L = q >>> 8 & 15;
                    I = q >>> 4 & 15;
                    J = q & 15;
                    v = (k + n * w >> 1) + G;
                    0 != (q & 268435456) != l ? (E = t, d.setScanLines(q & 268435456)) : t != E && (E = t, viewport.parentElement.style.backgroundColor = l ? f[E] : g[E]);
                    s.globalCompositeOperation = "source-over";
                    s.globalAlpha = 1;
                    for (var z = t = 0, y = 0, x = 0, S = 0, O = 0, P = 0, K = 0, y = G; y <= T; ++y) {
                        x = B[y];
                        if (x == R[K] && y != v && y != A) {
                            if (++K, t += 9, t >= e && (z += 16, t = 0, z >= c)) break
                        } else {
                            R[K++] = x;
                            O = x >> 8 & 15;
                            S = x >> 12 & 15;
                            P = x & 255;
                            chx = P & 31;
                            chy = P >> 5 & 7;
                            s.fillStyle = D[S];
                            s.fillRect(t, z, 9, 16);
                            s.drawImage(N[O], 2 + 12 * chx, 2 + 19 * chy, 9, 16, t, z, 9, 16);
                            t += 9;
                            if (t >= e && (z += 16, t = 0, z >= c)) break;
                            x >>>= 16;
                            O = x >> 8 & 15;
                            S = x >> 12 & 15;
                            P = x & 255;
                            chx = P & 31;
                            chy = P >> 5 & 7;
                            s.fillStyle = D[S];
                            s.fillRect(t, z, 9, 16);
                            s.drawImage(N[O], 2 + 12 * chx, 2 + 19 * chy, 9, 16, t, z, 9, 16)
                        }
                        t += 9;
                        if (t >= e && (z += 16, t = 0, z >= c)) break
                    }
                    A = v;
                    F && (k < w && n < C) && (x = B[v], k & 1 && (x >>>= 16), O = x >> 8 & 15, 9 > H && (0 < J && 0 < I) && (9 < H + I && (I = 9 - H), 16 < L + J && (J = 16 - L), s.fillStyle = D[O], s.fillRect(9 * k + H, (n << 4) + L, I, J)));
                    1 < b && (h.scaleSmoothing(m, !1), m.globalAlpha = 1, m.globalCompositeOperation = "source-over", m.drawImage(u, 0, 0, e, c, 0, 0, p, r), l && null != X && (m.fillStyle = X, m.fillRect(0, 0, p, r), m.globalCompositeOperation = "lighter", h.scaleSmoothing(m, !0), m.globalAlpha = 0.5, m.drawImage(a, 0, 0, p, r, 1.5, 0, p, r), m.drawImage(a, 0, 0, p, r, -0.25, 1, p, r)));
                    B[0] = q
                }
            }
        };
        var K = [],
            N = null,
            X = null,
            Y = new h.ImageLoader("img/", function(a, b, c, d) {
                if (b) {
                    if (h.log("Loaded texture #" + d + " from: " + c), K[d] = a, Y.count == Y.loaded) {
                        b = document.createElement("canvas");
                        K[0] = b;
                        b.width = 64;
                        b.height = 64;
                        c = b.getContext("2d");
                        c.fillStyle = "#000";
                        c.globalAlpha = 1;
                        h.scaleSmoothing(c, !1);
                        for (d = 1; 64 > d; d += 2) c.fillRect(0, d, 64, 1);
                        X = c.createPattern(b, "repeat");
                        n(a, l ? k : g);
                        h.log("Display ready.");
                        U = !0
                    }
                } else h.log("Could not load texture #" + d + " from: " + c)
            });
        Y.queue("sc-font-9x16.png", 1);
        viewport.parentElement.style.backgroundColor = l && 1 < b ? f[E] : g[E];
        d.toString = function() {
            return "TextDisplay"
        }
    }
};
new function() {
    var h = System;
    h.onInit(function() {
        try {
            h.log = function(a) {
                console.log(a)
            };
            var g = new h.Environment,
                k = g.build(2097152),
                f = new h.Protocol;
            f.pos = 0;
            f.size = 64;
            f.direct = !0;
            g.support(f);
            var a = new h.Protocol;
            a.pos = f.size;
            a.size = 16384;
            a.direct = !0;
            g.support(a);
            var e = document.getElementById("viewport"),
                c = !0,
                b = new h.InputDevice(function(a) {
                    c || (0 <= a && (cycleDelay = -g.cycle(k, 32768), l.render()), 0 > cycleDelay && (c = !0))
                }),
                l;
            1440 <= e.offsetParent.offsetWidth + 4 && 800 <= e.offsetParent.offsetHeight + 4 ? (l = new h.TextDisplay(e, 720, 400, 2, !1), b.setScale(1)) : (l = new h.TextDisplay(e, 720, 400, 1, !1), b.setScale(2));
            window.setScanLines = l.setScanLines;
            var n = g.register(l);
            g.connect(k, a.id, n);
            var d = g.register(b);
            g.connect(k, f.id, d);
            var p = a.pos + a.size + 1023 & 268434432,
                f = [231945, 80, 83919369, 33293, 12288, 395785, 33293, 24576, 133641, 33587721, 33293, 65536, 264713, 33293, 65536, 68105, 33291, 72, 16809992, 33291, 4360, 33289, 2147483648, 33311, 204, 16809986, 33311, 140, 33297, 2147483648, 33290, 0, 295435, 100, 32, 33289, 64, 29193, 33297, 4278190080, 32, 524809, 557585, 4278190080, 295433, 64, 134511122, 67138057, 33297, 4278190080, 32, 295433, 64, 524815, 134511121, 67138057, 32, 33289, 536870912, 33311, 164, 32, 33311, 140, 33297, 536870912, 33290, 0, 295435, 292, 16809986, 33291, 248, 32, 33289, 72, 29193, 32, 295433, 64, 67400201, 67108873, 67141653, 67174409, 251756561, 84017161, 67272725, 84082697, 251887633, 32, 67371536, 262153, 67403795, 17039378, 33882121, 67469331, 50659346, 557577, 64, 588305, 4294901760, 67664402, 32, 295433, 68, 293385, 32, 295433, 68, 67138057, 32, 262665, 393481, 164383, 296, 168558857, 688393, 0, 201851162, 17334803, 202113552, 67910153, 819725, 4, 135004682, 1868299, 484, 32, 786953, 17596947, 68157961, 1081882, 160, 269222413, 135018761, 32, 786953, 17596947, 68157961, 1081882, 160, 269222413, 201863433, 32, 786953, 17596947, 68157961, 1081882, 160, 269222413, 135018505, 32, 786953, 17596947, 68157961, 1081882, 160, 269222413, 819725, 1, 151795721, 32, 528, 31241, 32, 528, 29193, 33290, 0, 1606155, 696, 16809986, 33291, 664, 67371536, 67402249, 32, 528, 29193, 32, 33289, 24, 291337, 67141646, 29193, 32, 33289, 28, 29193, 32, 33289, 32, 29193, 32, 33289, 16, 291337, 134250510, 553481, 67141645, 29193, 32, 786953, 68157961, 336855568, 135528457, 135593993, 253067281, 68452372, 253001745, 152338442, 2392587, 864, 806649869, 33291, 868, 1460961293, 229919, 576, 819725, 1, 353632265, 152338442, 2392587, 912, 806649869, 33291, 916, 1460961293, 229919, 576, 32, 135018505, 32, 295455, 296, 303169808, 17859091, 268698138, 16810515, 67109389, 269484560, 135294985, 269746185, 68190228, 252739601, 806387725, 957382666, 2130443, 1004, 655392781, 268449801, 33293, 2, 253001745, 806649869, 957644810, 2130443, 1040, 655654925, 335558665, 33293, 4, 557581, 1, 819726, 1, 819722, 0, 2392587, 964, 32, 33289, 20, 528905, 67141646, 266761, 67141646, 4617, 33311, 512, 32, 33311, 720, 33290, 0, 1344011, 1160, 33289, 0, 295434, 0, 1344011, 1184, 295433, 0, 33307, 18, 84181524, 33290, 79, 819723, 1220, 33289, 79, 295434, 24, 819723, 1244, 295433, 24, 33311, 544, 1081865, 20, 135272969, 68190222, 68164105, 68190222, 1055241, 557329, 255, 1946779657, 33311, 512, 32, 33289, 8, 266761, 67141646, 4617, 557577, 12, 786953, 819729, 15, 819738, 3, 201851405, 786953, 67928597, 65545, 16875537, 16908297, 16941072, 436305946, 436371482, 536969229, 537034765, 537952265, 1114121, 68255761, 68255760, 34701333, 134447113, 285409294, 51445769, 164383, 608, 557581, 1, 164383, 608, 557582, 2, 1081609, 1056, 17825801, 164383, 512, 34603017, 557581, 3, 164383, 512, 524809, 557585, 15, 557581, 62, 51445769, 164383, 608, 32, 33289, 8, 266761, 67141646, 4617, 557577, 12, 786953, 819729, 15, 819738, 3, 201851405, 786953, 67928597, 1081609, 20445, 4278485002, 1606155, 1620, 1192329225, 164383, 608, 557581, 1, 164383, 608, 557582, 2, 1074888713, 164383, 512, 3725623305, 557581, 3, 164383, 512, 4026826762, 2392587, 1740, 295435, 1712, 557581, 1, 557582, 2, 201982217, 164383, 412, 786953, 67928597, 524809, 557585, 15, 557581, 62, 1192329225, 4278485002, 1606155, 1780, 1326546953, 164383, 608, 4278485002, 1606155, 1812, 201982217, 164383, 412, 32, 134742544, 262665, 295441, 1, 295434, 0, 295435, 1848, 262665, 295441, 2, 295434, 0, 295435, 1888, 229919, 3276, 17334281, 262665, 295441, 4, 295434, 0, 295435, 1916, 262665, 295441, 8, 295434, 0, 295435, 1956, 229919, 3120, 17334281, 262665, 295441, 16, 295434, 0, 295435, 1996, 229919, 2072, 17334281, 262665, 295441, 32, 295434, 0, 295435, 2024, 262665, 295441, 64, 295434, 0, 295435, 2064, 229919, 2840, 17334281, 134218249, 32, 33311, 776, 151027722, 1606155, 2144, 819721, 8, 202379785, 4279271434, 295435, 2136, 1081865, 255, 269228553, 33291, 2144, 4027613193, 269228553, 637566986, 1606155, 2240, 360991, 1304, 819721, 4, 202379785, 1081866, 16, 2654731, 2228, 1081869, 16, 336855568, 1350154, 16, 1868299, 2228, 1350158, 16, 1081870, 16, 269228553, 671121418, 1606155, 2336, 360991, 1304, 819721, 4, 202379785, 1081866, 384, 1868299, 2324, 1081870, 16, 336855568, 1350154, 4294966896, 2654731, 2324, 1350157, 16, 1081869, 16, 269228553, 134250506, 295435, 2360, 620789770, 1606155, 2488, 360991, 1304, 819721, 8, 825866, 240, 2392587, 2404, 4279015440, 1606155, 2488, 819721, 4, 202379785, 1081866, 1, 1868299, 2448, 1081870, 1, 33291, 2484, 336855568, 1350154, 16, 1868299, 2488, 1350158, 16, 1081869, 15, 269228553, 134250506, 1606155, 2568, 202113552, 202379785, 67928077, 202379789, 67928077, 202117641, 819722, 255, 295435, 2560, 268988425, 4279009296, 201850897, 33291, 2564, 537427977, 135297033, 654344202, 1606155, 2708, 360991, 1304, 819721, 8, 825866, 240, 2392587, 2624, 4279015440, 295435, 2708, 819721, 4, 202379785, 1081866, 399, 2654731, 2668, 1081869, 1, 33291, 2704, 336855568, 1350154, 4294966896, 2654731, 2704, 1081870, 15, 1350157, 16, 269228553, 553680906, 1606155, 2772, 360991, 1304, 202113552, 825866, 384, 1868299, 2764, 825870, 384, 33291, 2772, 825865, 0, 570458122, 1606155, 2836, 360991, 1304, 202113552, 825866, 4294966512, 2654731, 2828, 825869, 384, 33291, 2836, 825865, 4294966896, 32, 33311, 776, 295434, 0, 295435, 3116, 819721, 8, 4279015434, 1606155, 2984, 360991, 1304, 360991, 228, 202113552, 202379785, 67928077, 202379789, 68188169, 1081866, 4294967295, 295435, 2980, 825869, 1, 825866, 400, 1868299, 2980, 825870, 16, 202113552, 825869, 16, 32, 269484560, 269750793, 68190217, 269750797, 336621577, 805601290, 1868299, 3116, 956596234, 2392587, 3040, 805601294, 33291, 3072, 537165842, 1627684874, 1868299, 3116, 1711570954, 2392587, 3116, 1459912718, 67436553, 67469331, 84148242, 201658377, 84148241, 84213775, 84934673, 68157458, 269776905, 33291, 2580, 32, 33311, 760, 33290, 0, 1344011, 3200, 360991, 1304, 202113552, 825866, 192, 1868299, 3188, 825870, 192, 33291, 3200, 825865, 0, 32, 33290, 0, 819723, 3272, 360991, 1304, 202113552, 825866, 4294966704, 2654731, 3260, 825869, 192, 33291, 3272, 825865, 4294966896, 32, 32, 33311, 744, 262153, 17072145, 294922, 295435, 3612, 295433, 12, 557577, 16, 819721, 8, 301578, 59, 1081867, 3516, 295455, 1304, 301578, 11, 2654731, 3404, 295433, 4, 134746633, 557594, 16, 301585, 15, 134486546, 32, 825865, 15, 67899913, 819726, 12, 819739, 3, 134746633, 557594, 16, 201851410, 295433, 4, 134486537, 295433, 12, 67899913, 819740, 3, 819722, 0, 1606155, 3512, 819721, 8, 825872, 255, 32, 825865, 255, 819721, 4, 134746633, 557594, 16, 135010825, 67637769, 557578, 62, 1868299, 3608, 557582, 62, 557578, 15, 2130443, 3600, 557577, 15, 135010834, 32, 32, 32, 33289, 1824, 33311, 444, 2654729, 0, 33289, 10, 671351305, 557321, 1203, 33311, 512, 33289, 60, 33311, 512, 33289, 66, 557321, 2049, 33311, 512, 33293, 1, 33290, 69, 2130443, 3692, 33289, 74, 557321, 2049, 33311, 512, 33293, 1, 33290, 77, 2130443, 3740, 33289, 24, 557321, 2080, 33311, 512, 33293, 1, 33290, 34, 2130443, 3788, 33289, 48, 557321, 2080, 33311, 512, 33293, 1, 33290, 58, 2130443, 3836, 33289, 14, 557321, 1082, 33311, 512, 33293, 6, 33290, 61, 1868299, 3884, 33289, 1, 557321, 1840, 33311, 512, 33293, 1, 33290, 2, 2130443, 3932, 33289, 3, 557321, 3888, 33311, 512, 33293, 1, 33290, 4, 2130443, 3980, 33289, 5, 557321, 3104, 33311, 512, 33293, 1, 33290, 6, 2130443, 4028, 33289, 7, 557321, 1056, 33311, 512, 33293, 1, 33290, 8, 2130443, 4076, 2654733, 1, 2654730, 25, 1868299, 3640, 32, 33289, 1824, 33311, 444, 33033, 0, 164105, 1, 33311, 412, 528, 47625, 74123091, 67141645, 47625, 74187893, 67141645, 47625, 73598060, 67141645, 47625, 73663599, 67141645, 47625, 69207141, 67141645, 47625, 74385228, 67141645, 47625, 73663585, 67141645, 47625, 74318953, 67141645, 47625, 67109991, 67141645, 47625, 69207072, 33311, 228, 554, 295433, 0, 33026, 512, 554, 262669, 295434, 512, 1868299, 4324, 32, 33311, 5288, 33311, 84, 33311, 648, 33289, 218169864, 33311, 360, 33311, 4144, 528, 262665, 39433, 1536, 67141645, 39433, 102, 67141645, 4026570761, 67141645, 67115529, 67141645, 67115529, 67141645, 33311, 3616, 33311, 5604, 33311, 6120, 673710608, 673972745, 741085705, 33289, 1, 671351305, 738722313, 403210773, 33311, 808, 738722313, 268993045, 33293, 2, 33311, 808, 738722313, 134775317, 33293, 2, 33311, 808, 738722313, 33293, 2, 33311, 808, 33289, 12, 671351305, 738722313, 819721, 16, 33311, 936, 33289, 62, 671351305, 738722313, 738984457, 3965449, 66, 738750985, 33311, 576, 33293, 1, 134775317, 1006633482, 1868299, 4660, 2916877, 4, 3965453, 4, 738750985, 33290, 75, 1868299, 4660, 2654733, 1, 2654730, 25, 1868299, 4500, 33311, 1536, 33311, 1128, 33311, 228, 295433, 28, 301578, 0, 295435, 4832, 67113503, 32770, 98847, 1304, 98847, 1088, 33291, 4488, 33311, 660, 98847, 1304, 98847, 1088, 33311, 1816, 33290, 0, 1606155, 4472, 33291, 4752, 33289, 24, 266761, 295434, 4294967295, 295435, 5044, 295441, 2147483647, 295434, 0, 295435, 5044, 819721, 0, 33289, 24, 39437, 4, 39434, 4016, 2392587, 5268, 4617, 33293, 64, 291337, 295441, 16711935, 295442, 67109888, 67140105, 819725, 1, 819722, 20, 2130443, 4948, 32, 39433, 12, 1081865, 7408, 1081869, 17408, 268698121, 295441, 15, 819721, 16, 67895822, 819729, 15, 202375693, 295433, 0, 1081869, 16, 268704265, 2130953, 296629226, 3781926562, 370832541, 4100533819, 1113097, 1640715937, 2282019202, 907678707, 3561557531, 537951248, 1081869, 16, 1113097, 3897955274, 3242966668, 909792445, 3561557531, 537951248, 1081869, 112, 1113097, 538976288, 538976288, 538976288, 538976288, 33289, 4, 39433, 128, 67141645, 4278229001, 469794825, 39433, 4888, 32, 33289, 28, 39433, 0, 32, 33289, 26112, 4, 2130947, 986125130, 2117622666, 1773876455, 1345566354, 1082377, 3835485448, 626029974, 848202269, 2539554945, 537920528, 268467209, 1342210061, 268467209, 536903693, 268467209, 1610645518, 270533635, 1082377, 4184631899, 2489423265, 2902401863, 554152117, 537920528, 268467209, 268468237, 270533635, 1082377, 1386827165, 344341847, 2769698716, 1750545076, 537920528, 268467209, 268468237, 270533635, 1082377, 1904909879, 1657915225, 531540249, 2314484855, 537920528, 268467209, 268468237, 270533635, 1082377, 3077683328, 2873561090, 2834377921, 91958683, 537920528, 268467209, 536903693, 270533635, 1082377, 201823064, 4047731608, 1944857960, 3928019016, 537920528, 268467209, 33289, 26188, 64009, 5668, 64013, 17408, 33289, 24, 39433, 0, 33289, 28, 39433, 0, 32, 33289, 26214, 290825, 3741614097, 294922, 1606155, 5664, 553711625, 33289, 26188, 29193, 33294, 17408, 68255762, 543, 32, 33289, 24, 39434, 0, 1606155, 5944, 295433, 25, 33289, 66, 557321, 1793, 33311, 608, 33293, 1, 33290, 69, 2130443, 5708, 33289, 62, 557321, 2049, 33311, 608, 33293, 1, 33290, 64, 2130443, 5756, 295438, 1, 295434, 0, 1344011, 5700, 1081865, 7408, 1081869, 17408, 268698121, 295441, 15, 819721, 16, 67895822, 819729, 15, 202375693, 1081869, 48, 528, 268442121, 33293, 4, 39433, 96, 33293, 4, 39433, 255, 33311, 228, 33289, 28, 39433, 6812, 32, 33289, 24, 266761, 295441, 2147483648, 295434, 0, 295435, 6100, 1081865, 7408, 1081869, 17408, 268698121, 295441, 15, 819721, 16, 67895822, 819729, 15, 202375693, 1081869, 144, 2130441, 32, 540021763, 806386704, 807410697, 33289, 24, 39437, 1, 39434, 2147483904, 2392587, 6100, 32, 33289, 28, 39433, 0, 32, 33289, 24, 266761, 295441, 2147483648, 295434, 0, 295435, 6572, 1081865, 7408, 1081869, 17408, 268698121, 295441, 15, 819721, 16, 67895822, 819729, 15, 202375693, 268435977, 33293, 144, 270562313, 536902666, 1606155, 6288, 33294, 12, 64009, 1068879309, 33293, 4, 64009, 3402485190, 33289, 24, 39433, 4294967295, 32, 3179017, 24, 3185162, 4294967295, 1606155, 6356, 3185161, 2147483648, 33294, 12, 64009, 559664589, 33293, 4, 64009, 3402485085, 32, 268435977, 33293, 135, 815113, 3742138385, 819210, 1606155, 6572, 553711625, 268435977, 33293, 144, 2126857, 4, 1081865, 32, 537926665, 33289, 24, 39433, 2147483648, 33289, 28, 39433, 6576, 33289, 4, 39433, 144, 1081865, 7408, 1081869, 17408, 268698121, 295441, 15, 819721, 16, 67895822, 819729, 15, 202375693, 268435977, 2130441, 538976288, 539230729, 539493129, 536902665, 33293, 16, 536902665, 33293, 16, 536902665, 32, 1081865, 7408, 1081869, 17408, 268698121, 295441, 15, 819721, 16, 67895822, 819729, 15, 202375693, 268435977, 33293, 144, 2130441, 32, 540021763, 807410697, 33289, 24, 39437, 4, 4617, 33297, 2147483647, 33290, 1012, 2392587, 6756, 33294, 4, 268435981, 295433, 0, 268809, 301585, 4294967280, 301581, 48, 33293, 192, 805338128, 32, 33289, 28, 39433, 0, 33289, 24, 39433, 2147483648, 33289, 0, 268442121, 39437, 48, 32, 33289, 24, 39434, 0, 1606155, 6880, 4, 2130947, 609603697, 3827201277, 2017767172, 305025323, 1081865, 32, 537926665, 39433, 1, 1081865, 32, 270537737, 1081865, 7408, 1081869, 17408, 268698121, 295441, 15, 819721, 16, 67895822, 819729, 15, 202375693, 791049, 39437, 1, 819740, 13, 819722, 12, 1606155, 6984, 32, 67928595, 202375693, 266761, 295441, 1, 295434, 0, 295435, 7048, 2130961, 4278255360, 4278255360, 4278255360, 4278255360, 33291, 7068, 2130961, 16711935, 16711935, 16711935, 16711935, 537951248, 39434, 120, 1868299, 7120, 33289, 28, 39433, 0, 67141646, 39433, 4294967295, 32, 538969091, 1081865, 32, 537926665, 32, 33289, 24, 266761, 295441, 2147483648, 295434, 0, 295435, 7404, 1081865, 7408, 1081869, 17408, 268698121, 295441, 15, 819721, 16, 67895822, 819729, 15, 202375693, 1081869, 16, 2130953, 296629226, 3781926562, 370832541, 4100533819, 537951241, 1113104, 815731403, 3494559619, 909792445, 3561557531, 1081869, 16, 537951241, 1113104, 3897955274, 3242966668, 909792445, 3561557531, 1081869, 112, 1113097, 2103055042, 3455133029, 2567071376, 2541834704, 33289, 0, 1081870, 96, 268442121, 67141645, 39433, 87, 33289, 28, 39433, 5948, 4, 33289, 32, 536878089, 32, 1463939758, 3326931380, 3056969150, 96598792, 1093237284, 3193090925, 1190316837, 2327456273, 3722913432, 656716174, 3986763130, 2805873590, 655296613, 4220167014, 412422730, 2896959909, 1240801077, 2289915026, 3091872572, 3004862258, 3774637222, 3029171748, 113609937, 342160229, 2169358072, 1857196085, 3035887015, 1991096755, 999209482, 62679574, 1621157293, 3415654802, 2679544969, 2589032546, 3091691, 2709876190, 3078451754, 1862372174, 1876609296, 2980959652, 767828645, 3056538818, 4199657431, 2224850305, 648831876, 762226756, 4125654416, 3281065681, 1824431908, 2972358790, 1154494572, 1004089482, 3964982144, 2333228622, 1937675833, 2027273804, 3023948975, 2061557655, 188418291, 2533739843, 3007707444, 2159632807, 1136306181, 580665584, 2822457629, 4264452840, 58240373, 2376750997, 3750055457, 2556437494, 1628000574, 579906905, 4235429432, 4127085373, 913888998, 2932837449, 423358060, 252269192, 2865927480, 3689710646, 3989525251, 1637073132, 800275110, 2048522342, 2413859470, 1537648706, 2124341735, 266630385, 4185899390, 455048676, 2424671937, 3462756120, 289337448, 304095005, 870003032, 3126552634, 839488576, 3184793007, 3216239573, 2639881168, 1477709771, 4267881742, 2057616676, 4208343878, 1889734753, 827265580, 527604906, 1250623640, 779874098, 4116551120, 174617448, 3811109075, 1811690580, 316416889, 3860212922, 2730276359, 1102894332, 559650798, 1369524717, 450582892, 1824573393, 2875254829, 992362217, 3164592277, 1296457222, 4034595309, 128042560, 579116589, 3312835567, 3795356162, 1657749439, 978098637, 1630663885, 3035715313, 1544040467, 630482770, 2371306047, 1158087676, 3621929687, 1937961774, 3443513511, 2112579222, 2959655290, 3924269802, 3276072179, 3489515428, 1711381242, 297442464, 2271032040, 1666967181, 2721614932, 3491540574, 1301902465, 188935495, 171527446, 1485392717, 4206122755, 1613435277, 490272048, 631303548, 4285628210, 2289052987, 968759551, 3919716872, 4004474864, 1168790043, 339990338, 3540096090, 1498078014, 2867058481, 3436039788, 2015604696, 1253651714, 680292690, 882954220, 3956364869, 77502352, 1372778815, 374944816, 3643810855, 2041911997, 2070458491, 1238485275, 3372360956, 1427420770, 3543888402, 2912813487, 3455043861, 231281468, 3945315909, 862585016, 3935976823, 3151638003, 609769078, 2776387579, 319276646, 3945177622, 659266984, 3190306416, 2157344998, 1762397601, 1298417490, 3778002297, 2552069204, 163327691, 3435023424, 4119692560, 3512525776, 1197504079, 3887470592, 546347638, 1634415293, 2616806129, 2872900568, 1694199789, 5354042, 943120895, 2918167529, 103197460, 3149448997, 4048513369, 4012034013, 3689522896, 2868704720, 4324678, 1350125003, 323601324, 1000335329, 982868308, 4190641745, 3140213306, 1658072050, 143663500, 1141107051, 2695732704, 1304434742, 1835788832, 1129160006, 1053347312, 2326664085, 645850608, 2873011723, 2280265901, 1194850556, 858199173, 2889050345, 863553215, 3832171240, 3781720744, 3935368700, 2636202445, 3688914773, 2353269162, 3083470373, 927006586, 3087795051, 2277131589, 3411396375, 3277466918, 99297387, 3173141367, 3239510693, 536246121, 3383174193, 1677353172, 1783939601, 2981787914, 3619728433, 4110947920, 378108449, 2142644709, 1023959057, 720689136, 3304224958, 1915539692, 4162424131, 509622741, 731010050, 46826685, 217763498, 3982195385, 2853965943, 3376142862, 912267809, 2164645939, 1839274395, 957473694, 4116405984, 73902773, 3098905606, 173200160, 1977079677, 3412710853, 2513325798, 2500917750, 4190678970, 4284857351, 2877499588, 3609618488, 2693480212, 3987726937, 541157625, 716718698, 1261846761];
            g.load(k, f, p);
            g.init(k, p, p + (f.length << 2), 0, 0, 0, 0);
            c = !1
        } catch (r) {
            if ("number" == typeof r) throw g.explain(r);
            throw "boot: " + r.toString() + ": line " + r.lineNumber + ": " + r.fileName;
        }
        h.phase = b
    });
    h.start({
        canvas: "viewport",
        realtime: !0
    })
};