!(function () {
  function n() {}
  function t(n) {
    return n;
  }
  function e(n) {
    return !!n;
  }
  function r(n) {
    return !n;
  }
  function u(n) {
    return function () {
      if (null === n) throw new Error("Callback was already called.");
      n.apply(this, arguments), (n = null);
    };
  }
  function i(n) {
    return function () {
      null !== n && (n.apply(this, arguments), (n = null));
    };
  }
  function o(n) {
    return (
      M(n) ||
      ("number" == typeof n.length && n.length >= 0 && n.length % 1 === 0)
    );
  }
  function c(n, t) {
    for (var e = -1, r = n.length; ++e < r; ) t(n[e], e, n);
  }
  function a(n, t) {
    for (var e = -1, r = n.length, u = Array(r); ++e < r; )
      u[e] = t(n[e], e, n);
    return u;
  }
  function f(n) {
    return a(Array(n), function (n, t) {
      return t;
    });
  }
  function l(n, t, e) {
    return (
      c(n, function (n, r, u) {
        e = t(e, n, r, u);
      }),
      e
    );
  }
  function s(n, t) {
    c(W(n), function (e) {
      t(n[e], e);
    });
  }
  function p(n, t) {
    for (var e = 0; e < n.length; e++) if (n[e] === t) return e;
    return -1;
  }
  function h(n) {
    var t,
      e,
      r = -1;
    return o(n)
      ? ((t = n.length),
        function () {
          return r++, t > r ? r : null;
        })
      : ((e = W(n)),
        (t = e.length),
        function () {
          return r++, t > r ? e[r] : null;
        });
  }
  function m(n, t) {
    return (
      (t = null == t ? n.length - 1 : +t),
      function () {
        for (
          var e = Math.max(arguments.length - t, 0), r = Array(e), u = 0;
          e > u;
          u++
        )
          r[u] = arguments[u + t];
        switch (t) {
          case 0:
            return n.call(this, r);
          case 1:
            return n.call(this, arguments[0], r);
        }
      }
    );
  }
  function y(n) {
    return function (t, e, r) {
      return n(t, r);
    };
  }
  function v(t) {
    return function (e, r, o) {
      (o = i(o || n)), (e = e || []);
      var c = h(e);
      if (0 >= t) return o(null);
      var a = !1,
        f = 0,
        l = !1;
      !(function s() {
        if (a && 0 >= f) return o(null);
        for (; t > f && !l; ) {
          var n = c();
          if (null === n) return (a = !0), void (0 >= f && o(null));
          (f += 1),
            r(
              e[n],
              n,
              u(function (n) {
                (f -= 1), n ? (o(n), (l = !0)) : s();
              })
            );
        }
      })();
    };
  }
  function d(n) {
    return function (t, e, r) {
      return n(C.eachOf, t, e, r);
    };
  }
  function g(n) {
    return function (t, e, r, u) {
      return n(v(e), t, r, u);
    };
  }
  function k(n) {
    return function (t, e, r) {
      return n(C.eachOfSeries, t, e, r);
    };
  }
  function b(t, e, r, u) {
    (u = i(u || n)), (e = e || []);
    var c = o(e) ? [] : {};
    t(
      e,
      function (n, t, e) {
        r(n, function (n, r) {
          (c[t] = r), e(n);
        });
      },
      function (n) {
        u(n, c);
      }
    );
  }
  function w(n, t, e, r) {
    var u = [];
    n(
      t,
      function (n, t, r) {
        e(n, function (e) {
          e && u.push({ index: t, value: n }), r();
        });
      },
      function () {
        r(
          a(
            u.sort(function (n, t) {
              return n.index - t.index;
            }),
            function (n) {
              return n.value;
            }
          )
        );
      }
    );
  }
  function O(n, t, e, r) {
    w(
      n,
      t,
      function (n, t) {
        e(n, function (n) {
          t(!n);
        });
      },
      r
    );
  }
  function S(n, t, e) {
    return function (r, u, i, o) {
      function c() {
        o && o(e(!1, void 0));
      }
      function a(n, r, u) {
        return o
          ? void i(n, function (r) {
              o && t(r) && (o(e(!0, n)), (o = i = !1)), u();
            })
          : u();
      }
      arguments.length > 3 ? n(r, u, a, c) : ((o = i), (i = u), n(r, a, c));
    };
  }
  function E(n, t) {
    return t;
  }
  function L(t, e, r) {
    r = r || n;
    var u = o(e) ? [] : {};
    t(
      e,
      function (n, t, e) {
        n(
          m(function (n, r) {
            r.length <= 1 && (r = r[0]), (u[t] = r), e(n);
          })
        );
      },
      function (n) {
        r(n, u);
      }
    );
  }
  function I(n, t, e, r) {
    var u = [];
    n(
      t,
      function (n, t, r) {
        e(n, function (n, t) {
          (u = u.concat(t || [])), r(n);
        });
      },
      function (n) {
        r(n, u);
      }
    );
  }
  function x(t, e, r) {
    function i(t, e, r, u) {
      if (null != u && "function" != typeof u)
        throw new Error("task callback must be a function");
      return (
        (t.started = !0),
        M(e) || (e = [e]),
        0 === e.length && t.idle()
          ? C.setImmediate(function () {
              t.drain();
            })
          : (c(e, function (e) {
              var i = { data: e, callback: u || n };
              r ? t.tasks.unshift(i) : t.tasks.push(i),
                t.tasks.length === t.concurrency && t.saturated();
            }),
            void C.setImmediate(t.process))
      );
    }
    function o(n, t) {
      return function () {
        f -= 1;
        var e = !1,
          r = arguments;
        c(t, function (n) {
          c(l, function (t, r) {
            t !== n || e || (l.splice(r, 1), (e = !0));
          }),
            n.callback.apply(n, r);
        }),
          n.tasks.length + f === 0 && n.drain(),
          n.process();
      };
    }
    if (null == e) e = 1;
    else if (0 === e) throw new Error("Concurrency must not be zero");
    var f = 0,
      l = [],
      s = {
        tasks: [],
        concurrency: e,
        payload: r,
        saturated: n,
        empty: n,
        drain: n,
        started: !1,
        paused: !1,
        push: function (n, t) {
          i(s, n, !1, t);
        },
        kill: function () {
          (s.drain = n), (s.tasks = []);
        },
        unshift: function (n, t) {
          i(s, n, !0, t);
        },
        process: function () {
          if (!s.paused && f < s.concurrency && s.tasks.length)
            for (; f < s.concurrency && s.tasks.length; ) {
              var n = s.payload
                  ? s.tasks.splice(0, s.payload)
                  : s.tasks.splice(0, s.tasks.length),
                e = a(n, function (n) {
                  return n.data;
                });
              0 === s.tasks.length && s.empty(), (f += 1), l.push(n[0]);
              var r = u(o(s, n));
              t(e, r);
            }
        },
        length: function () {
          return s.tasks.length;
        },
        running: function () {
          return f;
        },
        workersList: function () {
          return l;
        },
        idle: function () {
          return s.tasks.length + f === 0;
        },
        pause: function () {
          s.paused = !0;
        },
        resume: function () {
          if (s.paused !== !1) {
            s.paused = !1;
            for (
              var n = Math.min(s.concurrency, s.tasks.length), t = 1;
              n >= t;
              t++
            )
              C.setImmediate(s.process);
          }
        },
      };
    return s;
  }
  function j(n) {
    return m(function (t, e) {
      t.apply(
        null,
        e.concat([
          m(function (t, e) {
            "object" == typeof console &&
              (t
                ? console.error && console.error(t)
                : console[n] &&
                  c(e, function (t) {
                    console[n](t);
                  }));
          }),
        ])
      );
    });
  }
  function A(n) {
    return function (t, e, r) {
      n(f(t), e, r);
    };
  }
  function T(n) {
    return m(function (t, e) {
      var r = m(function (e) {
        var r = this,
          u = e.pop();
        return n(
          t,
          function (n, t, u) {
            n.apply(r, e.concat([u]));
          },
          u
        );
      });
      return e.length ? r.apply(this, e) : r;
    });
  }
  function z(n) {
    return m(function (t) {
      var e = t.pop();
      t.push(function () {
        var n = arguments;
        r
          ? C.setImmediate(function () {
              e.apply(null, n);
            })
          : e.apply(null, n);
      });
      var r = !0;
      n.apply(this, t), (r = !1);
    });
  }
  var q,
    C = {},
    P =
      ("object" == typeof self && self.self === self && self) ||
      ("object" == typeof global && global.global === global && global) ||
      this;
  null != P && (q = P.async),
    (C.noConflict = function () {
      return (P.async = q), C;
    });
  var H = Object.prototype.toString,
    M =
      Array.isArray ||
      function (n) {
        return "[object Array]" === H.call(n);
      },
    U = function (n) {
      var t = typeof n;
      return "function" === t || ("object" === t && !!n);
    },
    W =
      Object.keys ||
      function (n) {
        var t = [];
        for (var e in n) n.hasOwnProperty(e) && t.push(e);
        return t;
      },
    B = "function" == typeof setImmediate && setImmediate,
    D = B
      ? function (n) {
          B(n);
        }
      : function (n) {
          setTimeout(n, 0);
        };
  "object" == typeof process && "function" == typeof process.nextTick
    ? (C.nextTick = process.nextTick)
    : (C.nextTick = D),
    (C.setImmediate = B ? D : C.nextTick),
    (C.forEach = C.each =
      function (n, t, e) {
        return C.eachOf(n, y(t), e);
      }),
    (C.forEachSeries = C.eachSeries =
      function (n, t, e) {
        return C.eachOfSeries(n, y(t), e);
      }),
    (C.forEachLimit = C.eachLimit =
      function (n, t, e, r) {
        return v(t)(n, y(e), r);
      }),
    (C.forEachOf = C.eachOf =
      function (t, e, r) {
        function o(n) {
          f--, n ? r(n) : null === c && 0 >= f && r(null);
        }
        (r = i(r || n)), (t = t || []);
        for (var c, a = h(t), f = 0; null != (c = a()); )
          (f += 1), e(t[c], c, u(o));
        0 === f && r(null);
      }),
    (C.forEachOfSeries = C.eachOfSeries =
      function (t, e, r) {
        function o() {
          var n = !0;
          return null === a
            ? r(null)
            : (e(
                t[a],
                a,
                u(function (t) {
                  if (t) r(t);
                  else {
                    if (((a = c()), null === a)) return r(null);
                    n ? C.setImmediate(o) : o();
                  }
                })
              ),
              void (n = !1));
        }
        (r = i(r || n)), (t = t || []);
        var c = h(t),
          a = c();
        o();
      }),
    (C.forEachOfLimit = C.eachOfLimit =
      function (n, t, e, r) {
        v(t)(n, e, r);
      }),
    (C.map = d(b)),
    (C.mapSeries = k(b)),
    (C.mapLimit = g(b)),
    (C.inject =
      C.foldl =
      C.reduce =
        function (n, t, e, r) {
          C.eachOfSeries(
            n,
            function (n, r, u) {
              e(t, n, function (n, e) {
                (t = e), u(n);
              });
            },
            function (n) {
              r(n, t);
            }
          );
        }),
    (C.foldr = C.reduceRight =
      function (n, e, r, u) {
        var i = a(n, t).reverse();
        C.reduce(i, e, r, u);
      }),
    (C.transform = function (n, t, e, r) {
      3 === arguments.length && ((r = e), (e = t), (t = M(n) ? [] : {})),
        C.eachOf(
          n,
          function (n, r, u) {
            e(t, n, r, u);
          },
          function (n) {
            r(n, t);
          }
        );
    }),
    (C.select = C.filter = d(w)),
    (C.selectLimit = C.filterLimit = g(w)),
    (C.selectSeries = C.filterSeries = k(w)),
    (C.reject = d(O)),
    (C.rejectLimit = g(O)),
    (C.rejectSeries = k(O)),
    (C.any = C.some = S(C.eachOf, e, t)),
    (C.someLimit = S(C.eachOfLimit, e, t)),
    (C.all = C.every = S(C.eachOf, r, r)),
    (C.everyLimit = S(C.eachOfLimit, r, r)),
    (C.detect = S(C.eachOf, t, E)),
    (C.detectSeries = S(C.eachOfSeries, t, E)),
    (C.detectLimit = S(C.eachOfLimit, t, E)),
    (C.sortBy = function (n, t, e) {
      function r(n, t) {
        var e = n.criteria,
          r = t.criteria;
        return r > e ? -1 : e > r ? 1 : 0;
      }
      C.map(
        n,
        function (n, e) {
          t(n, function (t, r) {
            t ? e(t) : e(null, { value: n, criteria: r });
          });
        },
        function (n, t) {
          return n
            ? e(n)
            : void e(
                null,
                a(t.sort(r), function (n) {
                  return n.value;
                })
              );
        }
      );
    }),
    (C.auto = function (t, e, r) {
      function u(n) {
        d.unshift(n);
      }
      function o(n) {
        var t = p(d, n);
        t >= 0 && d.splice(t, 1);
      }
      function a() {
        h--,
          c(d.slice(0), function (n) {
            n();
          });
      }
      r || ((r = e), (e = null)), (r = i(r || n));
      var f = W(t),
        h = f.length;
      if (!h) return r(null);
      e || (e = h);
      var y = {},
        v = 0,
        d = [];
      u(function () {
        h || r(null, y);
      }),
        c(f, function (n) {
          function i() {
            return (
              e > v &&
              l(
                g,
                function (n, t) {
                  return n && y.hasOwnProperty(t);
                },
                !0
              ) &&
              !y.hasOwnProperty(n)
            );
          }
          function c() {
            i() && (v++, o(c), h[h.length - 1](d, y));
          }
          for (
            var f,
              h = M(t[n]) ? t[n] : [t[n]],
              d = m(function (t, e) {
                if ((v--, e.length <= 1 && (e = e[0]), t)) {
                  var u = {};
                  s(y, function (n, t) {
                    u[t] = n;
                  }),
                    (u[n] = e),
                    r(t, u);
                } else (y[n] = e), C.setImmediate(a);
              }),
              g = h.slice(0, h.length - 1),
              k = g.length;
            k--;

          ) {
            if (!(f = t[g[k]])) throw new Error("Has inexistant dependency");
            if (M(f) && p(f, n) >= 0)
              throw new Error("Has cyclic dependencies");
          }
          i() ? (v++, h[h.length - 1](d, y)) : u(c);
        });
    }),
    (C.retry = function (n, t, e) {
      function r(n, t) {
        if ("number" == typeof t) n.times = parseInt(t, 10) || i;
        else {
          if ("object" != typeof t)
            throw new Error(
              "Unsupported argument type for 'times': " + typeof t
            );
          (n.times = parseInt(t.times, 10) || i),
            (n.interval = parseInt(t.interval, 10) || o);
        }
      }
      function u(n, t) {
        function e(n, e) {
          return function (r) {
            n(function (n, t) {
              r(!n || e, { err: n, result: t });
            }, t);
          };
        }
        function r(n) {
          return function (t) {
            setTimeout(function () {
              t(null);
            }, n);
          };
        }
        for (; a.times; ) {
          var u = !(a.times -= 1);
          c.push(e(a.task, u)), !u && a.interval > 0 && c.push(r(a.interval));
        }
        C.series(c, function (t, e) {
          (e = e[e.length - 1]), (n || a.callback)(e.err, e.result);
        });
      }
      var i = 5,
        o = 0,
        c = [],
        a = { times: i, interval: o },
        f = arguments.length;
      if (1 > f || f > 3)
        throw new Error(
          "Invalid arguments - must be either (task), (task, callback), (times, task) or (times, task, callback)"
        );
      return (
        2 >= f && "function" == typeof n && ((e = t), (t = n)),
        "function" != typeof n && r(a, n),
        (a.callback = e),
        (a.task = t),
        a.callback ? u() : u
      );
    }),
    (C.waterfall = function (t, e) {
      function r(n) {
        return m(function (t, u) {
          if (t) e.apply(null, [t].concat(u));
          else {
            var i = n.next();
            i ? u.push(r(i)) : u.push(e), z(n).apply(null, u);
          }
        });
      }
      if (((e = i(e || n)), !M(t))) {
        var u = new Error(
          "First argument to waterfall must be an array of functions"
        );
        return e(u);
      }
      return t.length ? void r(C.iterator(t))() : e();
    }),
    (C.parallel = function (n, t) {
      L(C.eachOf, n, t);
    }),
    (C.parallelLimit = function (n, t, e) {
      L(v(t), n, e);
    }),
    (C.series = function (n, t) {
      L(C.eachOfSeries, n, t);
    }),
    (C.iterator = function (n) {
      function t(e) {
        function r() {
          return n.length && n[e].apply(null, arguments), r.next();
        }
        return (
          (r.next = function () {
            return e < n.length - 1 ? t(e + 1) : null;
          }),
          r
        );
      }
      return t(0);
    }),
    (C.apply = m(function (n, t) {
      return m(function (e) {
        return n.apply(null, t.concat(e));
      });
    })),
    (C.concat = d(I)),
    (C.concatSeries = k(I)),
    (C.whilst = function (t, e, r) {
      if (((r = r || n), t())) {
        var u = m(function (n, i) {
          n ? r(n) : t.apply(this, i) ? e(u) : r(null);
        });
        e(u);
      } else r(null);
    }),
    (C.doWhilst = function (n, t, e) {
      var r = 0;
      return C.whilst(
        function () {
          return ++r <= 1 || t.apply(this, arguments);
        },
        n,
        e
      );
    }),
    (C.until = function (n, t, e) {
      return C.whilst(
        function () {
          return !n.apply(this, arguments);
        },
        t,
        e
      );
    }),
    (C.doUntil = function (n, t, e) {
      return C.doWhilst(
        n,
        function () {
          return !t.apply(this, arguments);
        },
        e
      );
    }),
    (C.during = function (t, e, r) {
      r = r || n;
      var u = m(function (n, e) {
          n ? r(n) : (e.push(i), t.apply(this, e));
        }),
        i = function (n, t) {
          n ? r(n) : t ? e(u) : r(null);
        };
      t(i);
    }),
    (C.doDuring = function (n, t, e) {
      var r = 0;
      C.during(
        function (n) {
          r++ < 1 ? n(null, !0) : t.apply(this, arguments);
        },
        n,
        e
      );
    }),
    (C.queue = function (n, t) {
      var e = x(
        function (t, e) {
          n(t[0], e);
        },
        t,
        1
      );
      return e;
    }),
    (C.priorityQueue = function (t, e) {
      function r(n, t) {
        return n.priority - t.priority;
      }
      function u(n, t, e) {
        for (var r = -1, u = n.length - 1; u > r; ) {
          var i = r + ((u - r + 1) >>> 1);
          e(t, n[i]) >= 0 ? (r = i) : (u = i - 1);
        }
        return r;
      }
      function i(t, e, i, o) {
        if (null != o && "function" != typeof o)
          throw new Error("task callback must be a function");
        return (
          (t.started = !0),
          M(e) || (e = [e]),
          0 === e.length
            ? C.setImmediate(function () {
                t.drain();
              })
            : void c(e, function (e) {
                var c = {
                  data: e,
                  priority: i,
                  callback: "function" == typeof o ? o : n,
                };
                t.tasks.splice(u(t.tasks, c, r) + 1, 0, c),
                  t.tasks.length === t.concurrency && t.saturated(),
                  C.setImmediate(t.process);
              })
        );
      }
      var o = C.queue(t, e);
      return (
        (o.push = function (n, t, e) {
          i(o, n, t, e);
        }),
        delete o.unshift,
        o
      );
    }),
    (C.cargo = function (n, t) {
      return x(n, 1, t);
    }),
    (C.log = j("log")),
    (C.dir = j("dir")),
    (C.memoize = function (n, e) {
      var r = {},
        u = {};
      e = e || t;
      var i = m(function (t) {
        var i = t.pop(),
          o = e.apply(null, t);
        o in r
          ? C.setImmediate(function () {
              i.apply(null, r[o]);
            })
          : o in u
          ? u[o].push(i)
          : ((u[o] = [i]),
            n.apply(
              null,
              t.concat([
                m(function (n) {
                  r[o] = n;
                  var t = u[o];
                  delete u[o];
                  for (var e = 0, i = t.length; i > e; e++) t[e].apply(null, n);
                }),
              ])
            ));
      });
      return (i.memo = r), (i.unmemoized = n), i;
    }),
    (C.unmemoize = function (n) {
      return function () {
        return (n.unmemoized || n).apply(null, arguments);
      };
    }),
    (C.times = A(C.map)),
    (C.timesSeries = A(C.mapSeries)),
    (C.timesLimit = function (n, t, e, r) {
      return C.mapLimit(f(n), t, e, r);
    }),
    (C.seq = function () {
      var t = arguments;
      return m(function (e) {
        var r = this,
          u = e[e.length - 1];
        "function" == typeof u ? e.pop() : (u = n),
          C.reduce(
            t,
            e,
            function (n, t, e) {
              t.apply(
                r,
                n.concat([
                  m(function (n, t) {
                    e(n, t);
                  }),
                ])
              );
            },
            function (n, t) {
              u.apply(r, [n].concat(t));
            }
          );
      });
    }),
    (C.compose = function () {
      return C.seq.apply(null, Array.prototype.reverse.call(arguments));
    }),
    (C.applyEach = T(C.eachOf)),
    (C.applyEachSeries = T(C.eachOfSeries)),
    (C.forever = function (t, e) {
      function r(n) {
        return n ? i(n) : void o(r);
      }
      var i = u(e || n),
        o = z(t);
      r();
    }),
    (C.ensureAsync = z),
    (C.constant = m(function (n) {
      var t = [null].concat(n);
      return function (n) {
        return n.apply(this, t);
      };
    })),
    (C.wrapSync = C.asyncify =
      function (n) {
        return m(function (t) {
          var e,
            r = t.pop();
          try {
            e = n.apply(this, t);
          } catch (u) {
            return r(u);
          }
          U(e) && "function" == typeof e.then
            ? e
                .then(function (n) {
                  r(null, n);
                })
                ["catch"](function (n) {
                  r(n.message ? n : new Error(n));
                })
            : r(null, e);
        });
      }),
    "object" == typeof module && module.exports
      ? (module.exports = C)
      : "function" == typeof define && define.amd
      ? define([], function () {
          return C;
        })
      : (P.async = C);
})();
