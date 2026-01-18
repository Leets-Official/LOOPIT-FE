import { j as a, a as L } from './index-CtGBG9o5.js';
var qe = /\s+/g,
  Xe = (e) => (typeof e != 'string' || !e ? e : e.replace(qe, ' ').trim()),
  xe = (...e) => {
    const o = [],
      t = (r) => {
        if (!r && r !== 0 && r !== 0n) return;
        if (Array.isArray(r)) {
          for (let s = 0, l = r.length; s < l; s++) t(r[s]);
          return;
        }
        const n = typeof r;
        if (n === 'string' || n === 'number' || n === 'bigint') {
          if (n === 'number' && r !== r) return;
          o.push(String(r));
        } else if (n === 'object') {
          const s = Object.keys(r);
          for (let l = 0, p = s.length; l < p; l++) {
            const u = s[l];
            r[u] && o.push(u);
          }
        }
      };
    for (let r = 0, n = e.length; r < n; r++) {
      const s = e[r];
      s != null && t(s);
    }
    return o.length > 0 ? Xe(o.join(' ')) : void 0;
  },
  ze = (e) => (e === !1 ? 'false' : e === !0 ? 'true' : e === 0 ? '0' : e),
  B = (e) => {
    if (!e || typeof e != 'object') return !0;
    for (const o in e) return !1;
    return !0;
  },
  Je = (e, o) => {
    if (e === o) return !0;
    if (!e || !o) return !1;
    const t = Object.keys(e),
      r = Object.keys(o);
    if (t.length !== r.length) return !1;
    for (let n = 0; n < t.length; n++) {
      const s = t[n];
      if (!r.includes(s) || e[s] !== o[s]) return !1;
    }
    return !0;
  },
  Qe = (e, o) => {
    for (const t in o)
      if (Object.prototype.hasOwnProperty.call(o, t)) {
        const r = o[t];
        t in e ? (e[t] = xe(e[t], r)) : (e[t] = r);
      }
    return e;
  },
  Ie = (e, o) => {
    for (let t = 0; t < e.length; t++) {
      const r = e[t];
      Array.isArray(r) ? Ie(r, o) : r && o.push(r);
    }
  },
  Ee = (...e) => {
    const o = [];
    Ie(e, o);
    const t = [];
    for (let r = 0; r < o.length; r++) o[r] && t.push(o[r]);
    return t;
  },
  Ce = (e, o) => {
    const t = {};
    for (const r in e) {
      const n = e[r];
      if (r in o) {
        const s = o[r];
        Array.isArray(n) || Array.isArray(s)
          ? (t[r] = Ee(s, n))
          : typeof n == 'object' && typeof s == 'object' && n && s
            ? (t[r] = Ce(n, s))
            : (t[r] = s + ' ' + n);
      } else t[r] = n;
    }
    for (const r in o) r in e || (t[r] = o[r]);
    return t;
  },
  er = { twMerge: !0, twMergeConfig: {} };
function rr() {
  let e = null,
    o = {},
    t = !1;
  return {
    get cachedTwMerge() {
      return e;
    },
    set cachedTwMerge(r) {
      e = r;
    },
    get cachedTwMergeConfig() {
      return o;
    },
    set cachedTwMergeConfig(r) {
      o = r;
    },
    get didTwMergeConfigChange() {
      return t;
    },
    set didTwMergeConfigChange(r) {
      t = r;
    },
    reset() {
      ((e = null), (o = {}), (t = !1));
    },
  };
}
var Z = rr(),
  tr = (e) => {
    const o = (r, n) => {
      const {
          extend: s = null,
          slots: l = {},
          variants: p = {},
          compoundVariants: u = [],
          compoundSlots: f = [],
          defaultVariants: k = {},
        } = r,
        C = { ...er, ...n },
        A = s?.base ? xe(s.base, r?.base) : r?.base,
        y = s?.variants && !B(s.variants) ? Ce(p, s.variants) : p,
        T = s?.defaultVariants && !B(s.defaultVariants) ? { ...s.defaultVariants, ...k } : k;
      !B(C.twMergeConfig) &&
        !Je(C.twMergeConfig, Z.cachedTwMergeConfig) &&
        ((Z.didTwMergeConfigChange = !0), (Z.cachedTwMergeConfig = C.twMergeConfig));
      const M = B(s?.slots),
        S = B(l) ? {} : { base: xe(r?.base, M && s?.base), ...l },
        I = M ? S : Qe({ ...s?.slots }, B(S) ? { base: r?.base } : S),
        F = B(s?.compoundVariants) ? u : Ee(s?.compoundVariants, u),
        G = (j) => {
          if (B(y) && B(l) && M) return e(A, j?.class, j?.className)(C);
          if (F && !Array.isArray(F))
            throw new TypeError(
              `The "compoundVariants" prop must be an array. Received: ${typeof F}`
            );
          if (f && !Array.isArray(f))
            throw new TypeError(`The "compoundSlots" prop must be an array. Received: ${typeof f}`);
          const H = (b, x = y, h = null, v = null) => {
              const i = x[b];
              if (!i || B(i)) return null;
              const N = v?.[b] ?? j?.[b];
              if (N === null) return null;
              const E = ze(N);
              if (typeof E == 'object') return null;
              const W = T?.[b],
                R = E ?? ze(W);
              return i[R || 'false'];
            },
            K = () => {
              if (!y) return null;
              const b = Object.keys(y),
                x = [];
              for (let h = 0; h < b.length; h++) {
                const v = H(b[h], y);
                v && x.push(v);
              }
              return x;
            },
            m = (b, x) => {
              if (!y || typeof y != 'object') return null;
              const h = [];
              for (const v in y) {
                const i = H(v, y, b, x),
                  N = b === 'base' && typeof i == 'string' ? i : i && i[b];
                N && h.push(N);
              }
              return h;
            },
            D = {};
          for (const b in j) {
            const x = j[b];
            x !== void 0 && (D[b] = x);
          }
          const te = (b, x) => {
              const h = typeof j?.[b] == 'object' ? { [b]: j[b]?.initial } : {};
              return { ...T, ...D, ...h, ...x };
            },
            oe = (b = [], x) => {
              const h = [],
                v = b.length;
              for (let i = 0; i < v; i++) {
                const { class: N, className: E, ...W } = b[i];
                let R = !0;
                const w = te(null, x);
                for (const V in W) {
                  const O = W[V],
                    Y = w[V];
                  if (Array.isArray(O)) {
                    if (!O.includes(Y)) {
                      R = !1;
                      break;
                    }
                  } else {
                    if ((O == null || O === !1) && (Y == null || Y === !1)) continue;
                    if (Y !== O) {
                      R = !1;
                      break;
                    }
                  }
                }
                R && (N && h.push(N), E && h.push(E));
              }
              return h;
            },
            X = (b) => {
              const x = oe(F, b);
              if (!Array.isArray(x)) return x;
              const h = {},
                v = e;
              for (let i = 0; i < x.length; i++) {
                const N = x[i];
                if (typeof N == 'string') h.base = v(h.base, N)(C);
                else if (typeof N == 'object') for (const E in N) h[E] = v(h[E], N[E])(C);
              }
              return h;
            },
            le = (b) => {
              if (f.length < 1) return null;
              const x = {},
                h = te(null, b);
              for (let v = 0; v < f.length; v++) {
                const { slots: i = [], class: N, className: E, ...W } = f[v];
                if (!B(W)) {
                  let R = !0;
                  for (const w in W) {
                    const V = h[w],
                      O = W[w];
                    if (V === void 0 || (Array.isArray(O) ? !O.includes(V) : O !== V)) {
                      R = !1;
                      break;
                    }
                  }
                  if (!R) continue;
                }
                for (let R = 0; R < i.length; R++) {
                  const w = i[R];
                  (x[w] || (x[w] = []), x[w].push([N, E]));
                }
              }
              return x;
            };
          if (!B(l) || !M) {
            const b = {};
            if (typeof I == 'object' && !B(I)) {
              const x = e;
              for (const h in I)
                b[h] = (v) => {
                  const i = X(v),
                    N = le(v);
                  return x(
                    I[h],
                    m(h, v),
                    i ? i[h] : void 0,
                    N ? N[h] : void 0,
                    v?.class,
                    v?.className
                  )(C);
                };
            }
            return b;
          }
          return e(A, K(), oe(F), j?.class, j?.className)(C);
        },
        _ = () => {
          if (!(!y || typeof y != 'object')) return Object.keys(y);
        };
      return (
        (G.variantKeys = _()),
        (G.extend = s),
        (G.base = A),
        (G.slots = I),
        (G.variants = y),
        (G.defaultVariants = T),
        (G.compoundSlots = f),
        (G.compoundVariants = F),
        G
      );
    };
    return { tv: o, createTV: (r) => (n, s) => o(n, s ? Ce(r, s) : r) };
  };
const or = (e, o) => {
    const t = new Array(e.length + o.length);
    for (let r = 0; r < e.length; r++) t[r] = e[r];
    for (let r = 0; r < o.length; r++) t[e.length + r] = o[r];
    return t;
  },
  sr = (e, o) => ({ classGroupId: e, validator: o }),
  Le = (e = new Map(), o = null, t) => ({ nextPart: e, validators: o, classGroupId: t }),
  ye = '-',
  Ae = [],
  nr = 'arbitrary..',
  ar = (e) => {
    const o = ir(e),
      { conflictingClassGroups: t, conflictingClassGroupModifiers: r } = e;
    return {
      getClassGroupId: (l) => {
        if (l.startsWith('[') && l.endsWith(']')) return lr(l);
        const p = l.split(ye),
          u = p[0] === '' && p.length > 1 ? 1 : 0;
        return Oe(p, u, o);
      },
      getConflictingClassGroupIds: (l, p) => {
        if (p) {
          const u = r[l],
            f = t[l];
          return u ? (f ? or(f, u) : u) : f || Ae;
        }
        return t[l] || Ae;
      },
    };
  },
  Oe = (e, o, t) => {
    if (e.length - o === 0) return t.classGroupId;
    const n = e[o],
      s = t.nextPart.get(n);
    if (s) {
      const f = Oe(e, o + 1, s);
      if (f) return f;
    }
    const l = t.validators;
    if (l === null) return;
    const p = o === 0 ? e.join(ye) : e.slice(o).join(ye),
      u = l.length;
    for (let f = 0; f < u; f++) {
      const k = l[f];
      if (k.validator(p)) return k.classGroupId;
    }
  },
  lr = (e) =>
    e.slice(1, -1).indexOf(':') === -1
      ? void 0
      : (() => {
          const o = e.slice(1, -1),
            t = o.indexOf(':'),
            r = o.slice(0, t);
          return r ? nr + r : void 0;
        })(),
  ir = (e) => {
    const { theme: o, classGroups: t } = e;
    return cr(t, o);
  },
  cr = (e, o) => {
    const t = Le();
    for (const r in e) {
      const n = e[r];
      Me(n, t, r, o);
    }
    return t;
  },
  Me = (e, o, t, r) => {
    const n = e.length;
    for (let s = 0; s < n; s++) {
      const l = e[s];
      dr(l, o, t, r);
    }
  },
  dr = (e, o, t, r) => {
    if (typeof e == 'string') {
      ur(e, o, t);
      return;
    }
    if (typeof e == 'function') {
      pr(e, o, t, r);
      return;
    }
    mr(e, o, t, r);
  },
  ur = (e, o, t) => {
    const r = e === '' ? o : Be(o, e);
    r.classGroupId = t;
  },
  pr = (e, o, t, r) => {
    if (fr(e)) {
      Me(e(r), o, t, r);
      return;
    }
    (o.validators === null && (o.validators = []), o.validators.push(sr(t, e)));
  },
  mr = (e, o, t, r) => {
    const n = Object.entries(e),
      s = n.length;
    for (let l = 0; l < s; l++) {
      const [p, u] = n[l];
      Me(u, Be(o, p), t, r);
    }
  },
  Be = (e, o) => {
    let t = e;
    const r = o.split(ye),
      n = r.length;
    for (let s = 0; s < n; s++) {
      const l = r[s];
      let p = t.nextPart.get(l);
      (p || ((p = Le()), t.nextPart.set(l, p)), (t = p));
    }
    return t;
  },
  fr = (e) => 'isThemeGetter' in e && e.isThemeGetter === !0,
  gr = (e) => {
    if (e < 1) return { get: () => {}, set: () => {} };
    let o = 0,
      t = Object.create(null),
      r = Object.create(null);
    const n = (s, l) => {
      ((t[s] = l), o++, o > e && ((o = 0), (r = t), (t = Object.create(null))));
    };
    return {
      get(s) {
        let l = t[s];
        if (l !== void 0) return l;
        if ((l = r[s]) !== void 0) return (n(s, l), l);
      },
      set(s, l) {
        s in t ? (t[s] = l) : n(s, l);
      },
    };
  },
  je = '!',
  Te = ':',
  hr = [],
  Pe = (e, o, t, r, n) => ({
    modifiers: e,
    hasImportantModifier: o,
    baseClassName: t,
    maybePostfixModifierPosition: r,
    isExternal: n,
  }),
  br = (e) => {
    const { prefix: o, experimentalParseClassName: t } = e;
    let r = (n) => {
      const s = [];
      let l = 0,
        p = 0,
        u = 0,
        f;
      const k = n.length;
      for (let M = 0; M < k; M++) {
        const S = n[M];
        if (l === 0 && p === 0) {
          if (S === Te) {
            (s.push(n.slice(u, M)), (u = M + 1));
            continue;
          }
          if (S === '/') {
            f = M;
            continue;
          }
        }
        S === '[' ? l++ : S === ']' ? l-- : S === '(' ? p++ : S === ')' && p--;
      }
      const C = s.length === 0 ? n : n.slice(u);
      let A = C,
        y = !1;
      C.endsWith(je)
        ? ((A = C.slice(0, -1)), (y = !0))
        : C.startsWith(je) && ((A = C.slice(1)), (y = !0));
      const T = f && f > u ? f - u : void 0;
      return Pe(s, y, A, T);
    };
    if (o) {
      const n = o + Te,
        s = r;
      r = (l) => (l.startsWith(n) ? s(l.slice(n.length)) : Pe(hr, !1, l, void 0, !0));
    }
    if (t) {
      const n = r;
      r = (s) => t({ className: s, parseClassName: n });
    }
    return r;
  },
  xr = (e) => {
    const o = new Map();
    return (
      e.orderSensitiveModifiers.forEach((t, r) => {
        o.set(t, 1e6 + r);
      }),
      (t) => {
        const r = [];
        let n = [];
        for (let s = 0; s < t.length; s++) {
          const l = t[s],
            p = l[0] === '[',
            u = o.has(l);
          p || u ? (n.length > 0 && (n.sort(), r.push(...n), (n = [])), r.push(l)) : n.push(l);
        }
        return (n.length > 0 && (n.sort(), r.push(...n)), r);
      }
    );
  },
  yr = (e) => ({ cache: gr(e.cacheSize), parseClassName: br(e), sortModifiers: xr(e), ...ar(e) }),
  vr = /\s+/,
  wr = (e, o) => {
    const {
        parseClassName: t,
        getClassGroupId: r,
        getConflictingClassGroupIds: n,
        sortModifiers: s,
      } = o,
      l = [],
      p = e.trim().split(vr);
    let u = '';
    for (let f = p.length - 1; f >= 0; f -= 1) {
      const k = p[f],
        {
          isExternal: C,
          modifiers: A,
          hasImportantModifier: y,
          baseClassName: T,
          maybePostfixModifierPosition: M,
        } = t(k);
      if (C) {
        u = k + (u.length > 0 ? ' ' + u : u);
        continue;
      }
      let S = !!M,
        I = r(S ? T.substring(0, M) : T);
      if (!I) {
        if (!S) {
          u = k + (u.length > 0 ? ' ' + u : u);
          continue;
        }
        if (((I = r(T)), !I)) {
          u = k + (u.length > 0 ? ' ' + u : u);
          continue;
        }
        S = !1;
      }
      const F = A.length === 0 ? '' : A.length === 1 ? A[0] : s(A).join(':'),
        G = y ? F + je : F,
        _ = G + I;
      if (l.indexOf(_) > -1) continue;
      l.push(_);
      const j = n(I, S);
      for (let H = 0; H < j.length; ++H) {
        const K = j[H];
        l.push(G + K);
      }
      u = k + (u.length > 0 ? ' ' + u : u);
    }
    return u;
  },
  kr = (...e) => {
    let o = 0,
      t,
      r,
      n = '';
    for (; o < e.length; ) (t = e[o++]) && (r = Fe(t)) && (n && (n += ' '), (n += r));
    return n;
  },
  Fe = (e) => {
    if (typeof e == 'string') return e;
    let o,
      t = '';
    for (let r = 0; r < e.length; r++) e[r] && (o = Fe(e[r])) && (t && (t += ' '), (t += o));
    return t;
  },
  Ne = (e, ...o) => {
    let t, r, n, s;
    const l = (u) => {
        const f = o.reduce((k, C) => C(k), e());
        return ((t = yr(f)), (r = t.cache.get), (n = t.cache.set), (s = p), p(u));
      },
      p = (u) => {
        const f = r(u);
        if (f) return f;
        const k = wr(u, t);
        return (n(u, k), k);
      };
    return ((s = l), (...u) => s(kr(...u)));
  },
  Cr = [],
  z = (e) => {
    const o = (t) => t[e] || Cr;
    return ((o.isThemeGetter = !0), o);
  },
  _e = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
  De = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
  jr = /^\d+\/\d+$/,
  Nr = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  Vr =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  Mr = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
  Sr = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  zr =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  J = (e) => jr.test(e),
  g = (e) => !!e && !Number.isNaN(Number(e)),
  $ = (e) => !!e && Number.isInteger(Number(e)),
  we = (e) => e.endsWith('%') && g(e.slice(0, -1)),
  U = (e) => Nr.test(e),
  Ar = () => !0,
  Tr = (e) => Vr.test(e) && !Mr.test(e),
  We = () => !1,
  Pr = (e) => Sr.test(e),
  Gr = (e) => zr.test(e),
  Rr = (e) => !c(e) && !d(e),
  Ir = (e) => Q(e, Ze, We),
  c = (e) => _e.test(e),
  q = (e) => Q(e, $e, Tr),
  ke = (e) => Q(e, Fr, g),
  Ge = (e) => Q(e, He, We),
  Er = (e) => Q(e, Ue, Gr),
  ue = (e) => Q(e, Ke, Pr),
  d = (e) => De.test(e),
  se = (e) => ee(e, $e),
  Lr = (e) => ee(e, _r),
  Re = (e) => ee(e, He),
  Or = (e) => ee(e, Ze),
  Br = (e) => ee(e, Ue),
  pe = (e) => ee(e, Ke, !0),
  Q = (e, o, t) => {
    const r = _e.exec(e);
    return r ? (r[1] ? o(r[1]) : t(r[2])) : !1;
  },
  ee = (e, o, t = !1) => {
    const r = De.exec(e);
    return r ? (r[1] ? o(r[1]) : t) : !1;
  },
  He = (e) => e === 'position' || e === 'percentage',
  Ue = (e) => e === 'image' || e === 'url',
  Ze = (e) => e === 'length' || e === 'size' || e === 'bg-size',
  $e = (e) => e === 'length',
  Fr = (e) => e === 'number',
  _r = (e) => e === 'family-name',
  Ke = (e) => e === 'shadow',
  Ve = () => {
    const e = z('color'),
      o = z('font'),
      t = z('text'),
      r = z('font-weight'),
      n = z('tracking'),
      s = z('leading'),
      l = z('breakpoint'),
      p = z('container'),
      u = z('spacing'),
      f = z('radius'),
      k = z('shadow'),
      C = z('inset-shadow'),
      A = z('text-shadow'),
      y = z('drop-shadow'),
      T = z('blur'),
      M = z('perspective'),
      S = z('aspect'),
      I = z('ease'),
      F = z('animate'),
      G = () => ['auto', 'avoid', 'all', 'avoid-page', 'page', 'left', 'right', 'column'],
      _ = () => [
        'center',
        'top',
        'bottom',
        'left',
        'right',
        'top-left',
        'left-top',
        'top-right',
        'right-top',
        'bottom-right',
        'right-bottom',
        'bottom-left',
        'left-bottom',
      ],
      j = () => [..._(), d, c],
      H = () => ['auto', 'hidden', 'clip', 'visible', 'scroll'],
      K = () => ['auto', 'contain', 'none'],
      m = () => [d, c, u],
      D = () => [J, 'full', 'auto', ...m()],
      te = () => [$, 'none', 'subgrid', d, c],
      oe = () => ['auto', { span: ['full', $, d, c] }, $, d, c],
      X = () => [$, 'auto', d, c],
      le = () => ['auto', 'min', 'max', 'fr', d, c],
      b = () => [
        'start',
        'end',
        'center',
        'between',
        'around',
        'evenly',
        'stretch',
        'baseline',
        'center-safe',
        'end-safe',
      ],
      x = () => ['start', 'end', 'center', 'stretch', 'center-safe', 'end-safe'],
      h = () => ['auto', ...m()],
      v = () => [
        J,
        'auto',
        'full',
        'dvw',
        'dvh',
        'lvw',
        'lvh',
        'svw',
        'svh',
        'min',
        'max',
        'fit',
        ...m(),
      ],
      i = () => [e, d, c],
      N = () => [..._(), Re, Ge, { position: [d, c] }],
      E = () => ['no-repeat', { repeat: ['', 'x', 'y', 'space', 'round'] }],
      W = () => ['auto', 'cover', 'contain', Or, Ir, { size: [d, c] }],
      R = () => [we, se, q],
      w = () => ['', 'none', 'full', f, d, c],
      V = () => ['', g, se, q],
      O = () => ['solid', 'dashed', 'dotted', 'double'],
      Y = () => [
        'normal',
        'multiply',
        'screen',
        'overlay',
        'darken',
        'lighten',
        'color-dodge',
        'color-burn',
        'hard-light',
        'soft-light',
        'difference',
        'exclusion',
        'hue',
        'saturation',
        'color',
        'luminosity',
      ],
      P = () => [g, we, Re, Ge],
      Se = () => ['', 'none', T, d, c],
      ie = () => ['none', g, d, c],
      ce = () => ['none', g, d, c],
      ve = () => [g, d, c],
      de = () => [J, 'full', ...m()];
    return {
      cacheSize: 500,
      theme: {
        animate: ['spin', 'ping', 'pulse', 'bounce'],
        aspect: ['video'],
        blur: [U],
        breakpoint: [U],
        color: [Ar],
        container: [U],
        'drop-shadow': [U],
        ease: ['in', 'out', 'in-out'],
        font: [Rr],
        'font-weight': [
          'thin',
          'extralight',
          'light',
          'normal',
          'medium',
          'semibold',
          'bold',
          'extrabold',
          'black',
        ],
        'inset-shadow': [U],
        leading: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose'],
        perspective: ['dramatic', 'near', 'normal', 'midrange', 'distant', 'none'],
        radius: [U],
        shadow: [U],
        spacing: ['px', g],
        text: [U],
        'text-shadow': [U],
        tracking: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest'],
      },
      classGroups: {
        aspect: [{ aspect: ['auto', 'square', J, c, d, S] }],
        container: ['container'],
        columns: [{ columns: [g, c, d, p] }],
        'break-after': [{ 'break-after': G() }],
        'break-before': [{ 'break-before': G() }],
        'break-inside': [{ 'break-inside': ['auto', 'avoid', 'avoid-page', 'avoid-column'] }],
        'box-decoration': [{ 'box-decoration': ['slice', 'clone'] }],
        box: [{ box: ['border', 'content'] }],
        display: [
          'block',
          'inline-block',
          'inline',
          'flex',
          'inline-flex',
          'table',
          'inline-table',
          'table-caption',
          'table-cell',
          'table-column',
          'table-column-group',
          'table-footer-group',
          'table-header-group',
          'table-row-group',
          'table-row',
          'flow-root',
          'grid',
          'inline-grid',
          'contents',
          'list-item',
          'hidden',
        ],
        sr: ['sr-only', 'not-sr-only'],
        float: [{ float: ['right', 'left', 'none', 'start', 'end'] }],
        clear: [{ clear: ['left', 'right', 'both', 'none', 'start', 'end'] }],
        isolation: ['isolate', 'isolation-auto'],
        'object-fit': [{ object: ['contain', 'cover', 'fill', 'none', 'scale-down'] }],
        'object-position': [{ object: j() }],
        overflow: [{ overflow: H() }],
        'overflow-x': [{ 'overflow-x': H() }],
        'overflow-y': [{ 'overflow-y': H() }],
        overscroll: [{ overscroll: K() }],
        'overscroll-x': [{ 'overscroll-x': K() }],
        'overscroll-y': [{ 'overscroll-y': K() }],
        position: ['static', 'fixed', 'absolute', 'relative', 'sticky'],
        inset: [{ inset: D() }],
        'inset-x': [{ 'inset-x': D() }],
        'inset-y': [{ 'inset-y': D() }],
        start: [{ start: D() }],
        end: [{ end: D() }],
        top: [{ top: D() }],
        right: [{ right: D() }],
        bottom: [{ bottom: D() }],
        left: [{ left: D() }],
        visibility: ['visible', 'invisible', 'collapse'],
        z: [{ z: [$, 'auto', d, c] }],
        basis: [{ basis: [J, 'full', 'auto', p, ...m()] }],
        'flex-direction': [{ flex: ['row', 'row-reverse', 'col', 'col-reverse'] }],
        'flex-wrap': [{ flex: ['nowrap', 'wrap', 'wrap-reverse'] }],
        flex: [{ flex: [g, J, 'auto', 'initial', 'none', c] }],
        grow: [{ grow: ['', g, d, c] }],
        shrink: [{ shrink: ['', g, d, c] }],
        order: [{ order: [$, 'first', 'last', 'none', d, c] }],
        'grid-cols': [{ 'grid-cols': te() }],
        'col-start-end': [{ col: oe() }],
        'col-start': [{ 'col-start': X() }],
        'col-end': [{ 'col-end': X() }],
        'grid-rows': [{ 'grid-rows': te() }],
        'row-start-end': [{ row: oe() }],
        'row-start': [{ 'row-start': X() }],
        'row-end': [{ 'row-end': X() }],
        'grid-flow': [{ 'grid-flow': ['row', 'col', 'dense', 'row-dense', 'col-dense'] }],
        'auto-cols': [{ 'auto-cols': le() }],
        'auto-rows': [{ 'auto-rows': le() }],
        gap: [{ gap: m() }],
        'gap-x': [{ 'gap-x': m() }],
        'gap-y': [{ 'gap-y': m() }],
        'justify-content': [{ justify: [...b(), 'normal'] }],
        'justify-items': [{ 'justify-items': [...x(), 'normal'] }],
        'justify-self': [{ 'justify-self': ['auto', ...x()] }],
        'align-content': [{ content: ['normal', ...b()] }],
        'align-items': [{ items: [...x(), { baseline: ['', 'last'] }] }],
        'align-self': [{ self: ['auto', ...x(), { baseline: ['', 'last'] }] }],
        'place-content': [{ 'place-content': b() }],
        'place-items': [{ 'place-items': [...x(), 'baseline'] }],
        'place-self': [{ 'place-self': ['auto', ...x()] }],
        p: [{ p: m() }],
        px: [{ px: m() }],
        py: [{ py: m() }],
        ps: [{ ps: m() }],
        pe: [{ pe: m() }],
        pt: [{ pt: m() }],
        pr: [{ pr: m() }],
        pb: [{ pb: m() }],
        pl: [{ pl: m() }],
        m: [{ m: h() }],
        mx: [{ mx: h() }],
        my: [{ my: h() }],
        ms: [{ ms: h() }],
        me: [{ me: h() }],
        mt: [{ mt: h() }],
        mr: [{ mr: h() }],
        mb: [{ mb: h() }],
        ml: [{ ml: h() }],
        'space-x': [{ 'space-x': m() }],
        'space-x-reverse': ['space-x-reverse'],
        'space-y': [{ 'space-y': m() }],
        'space-y-reverse': ['space-y-reverse'],
        size: [{ size: v() }],
        w: [{ w: [p, 'screen', ...v()] }],
        'min-w': [{ 'min-w': [p, 'screen', 'none', ...v()] }],
        'max-w': [{ 'max-w': [p, 'screen', 'none', 'prose', { screen: [l] }, ...v()] }],
        h: [{ h: ['screen', 'lh', ...v()] }],
        'min-h': [{ 'min-h': ['screen', 'lh', 'none', ...v()] }],
        'max-h': [{ 'max-h': ['screen', 'lh', ...v()] }],
        'font-size': [{ text: ['base', t, se, q] }],
        'font-smoothing': ['antialiased', 'subpixel-antialiased'],
        'font-style': ['italic', 'not-italic'],
        'font-weight': [{ font: [r, d, ke] }],
        'font-stretch': [
          {
            'font-stretch': [
              'ultra-condensed',
              'extra-condensed',
              'condensed',
              'semi-condensed',
              'normal',
              'semi-expanded',
              'expanded',
              'extra-expanded',
              'ultra-expanded',
              we,
              c,
            ],
          },
        ],
        'font-family': [{ font: [Lr, c, o] }],
        'fvn-normal': ['normal-nums'],
        'fvn-ordinal': ['ordinal'],
        'fvn-slashed-zero': ['slashed-zero'],
        'fvn-figure': ['lining-nums', 'oldstyle-nums'],
        'fvn-spacing': ['proportional-nums', 'tabular-nums'],
        'fvn-fraction': ['diagonal-fractions', 'stacked-fractions'],
        tracking: [{ tracking: [n, d, c] }],
        'line-clamp': [{ 'line-clamp': [g, 'none', d, ke] }],
        leading: [{ leading: [s, ...m()] }],
        'list-image': [{ 'list-image': ['none', d, c] }],
        'list-style-position': [{ list: ['inside', 'outside'] }],
        'list-style-type': [{ list: ['disc', 'decimal', 'none', d, c] }],
        'text-alignment': [{ text: ['left', 'center', 'right', 'justify', 'start', 'end'] }],
        'placeholder-color': [{ placeholder: i() }],
        'text-color': [{ text: i() }],
        'text-decoration': ['underline', 'overline', 'line-through', 'no-underline'],
        'text-decoration-style': [{ decoration: [...O(), 'wavy'] }],
        'text-decoration-thickness': [{ decoration: [g, 'from-font', 'auto', d, q] }],
        'text-decoration-color': [{ decoration: i() }],
        'underline-offset': [{ 'underline-offset': [g, 'auto', d, c] }],
        'text-transform': ['uppercase', 'lowercase', 'capitalize', 'normal-case'],
        'text-overflow': ['truncate', 'text-ellipsis', 'text-clip'],
        'text-wrap': [{ text: ['wrap', 'nowrap', 'balance', 'pretty'] }],
        indent: [{ indent: m() }],
        'vertical-align': [
          {
            align: [
              'baseline',
              'top',
              'middle',
              'bottom',
              'text-top',
              'text-bottom',
              'sub',
              'super',
              d,
              c,
            ],
          },
        ],
        whitespace: [
          { whitespace: ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap', 'break-spaces'] },
        ],
        break: [{ break: ['normal', 'words', 'all', 'keep'] }],
        wrap: [{ wrap: ['break-word', 'anywhere', 'normal'] }],
        hyphens: [{ hyphens: ['none', 'manual', 'auto'] }],
        content: [{ content: ['none', d, c] }],
        'bg-attachment': [{ bg: ['fixed', 'local', 'scroll'] }],
        'bg-clip': [{ 'bg-clip': ['border', 'padding', 'content', 'text'] }],
        'bg-origin': [{ 'bg-origin': ['border', 'padding', 'content'] }],
        'bg-position': [{ bg: N() }],
        'bg-repeat': [{ bg: E() }],
        'bg-size': [{ bg: W() }],
        'bg-image': [
          {
            bg: [
              'none',
              {
                linear: [{ to: ['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl'] }, $, d, c],
                radial: ['', d, c],
                conic: [$, d, c],
              },
              Br,
              Er,
            ],
          },
        ],
        'bg-color': [{ bg: i() }],
        'gradient-from-pos': [{ from: R() }],
        'gradient-via-pos': [{ via: R() }],
        'gradient-to-pos': [{ to: R() }],
        'gradient-from': [{ from: i() }],
        'gradient-via': [{ via: i() }],
        'gradient-to': [{ to: i() }],
        rounded: [{ rounded: w() }],
        'rounded-s': [{ 'rounded-s': w() }],
        'rounded-e': [{ 'rounded-e': w() }],
        'rounded-t': [{ 'rounded-t': w() }],
        'rounded-r': [{ 'rounded-r': w() }],
        'rounded-b': [{ 'rounded-b': w() }],
        'rounded-l': [{ 'rounded-l': w() }],
        'rounded-ss': [{ 'rounded-ss': w() }],
        'rounded-se': [{ 'rounded-se': w() }],
        'rounded-ee': [{ 'rounded-ee': w() }],
        'rounded-es': [{ 'rounded-es': w() }],
        'rounded-tl': [{ 'rounded-tl': w() }],
        'rounded-tr': [{ 'rounded-tr': w() }],
        'rounded-br': [{ 'rounded-br': w() }],
        'rounded-bl': [{ 'rounded-bl': w() }],
        'border-w': [{ border: V() }],
        'border-w-x': [{ 'border-x': V() }],
        'border-w-y': [{ 'border-y': V() }],
        'border-w-s': [{ 'border-s': V() }],
        'border-w-e': [{ 'border-e': V() }],
        'border-w-t': [{ 'border-t': V() }],
        'border-w-r': [{ 'border-r': V() }],
        'border-w-b': [{ 'border-b': V() }],
        'border-w-l': [{ 'border-l': V() }],
        'divide-x': [{ 'divide-x': V() }],
        'divide-x-reverse': ['divide-x-reverse'],
        'divide-y': [{ 'divide-y': V() }],
        'divide-y-reverse': ['divide-y-reverse'],
        'border-style': [{ border: [...O(), 'hidden', 'none'] }],
        'divide-style': [{ divide: [...O(), 'hidden', 'none'] }],
        'border-color': [{ border: i() }],
        'border-color-x': [{ 'border-x': i() }],
        'border-color-y': [{ 'border-y': i() }],
        'border-color-s': [{ 'border-s': i() }],
        'border-color-e': [{ 'border-e': i() }],
        'border-color-t': [{ 'border-t': i() }],
        'border-color-r': [{ 'border-r': i() }],
        'border-color-b': [{ 'border-b': i() }],
        'border-color-l': [{ 'border-l': i() }],
        'divide-color': [{ divide: i() }],
        'outline-style': [{ outline: [...O(), 'none', 'hidden'] }],
        'outline-offset': [{ 'outline-offset': [g, d, c] }],
        'outline-w': [{ outline: ['', g, se, q] }],
        'outline-color': [{ outline: i() }],
        shadow: [{ shadow: ['', 'none', k, pe, ue] }],
        'shadow-color': [{ shadow: i() }],
        'inset-shadow': [{ 'inset-shadow': ['none', C, pe, ue] }],
        'inset-shadow-color': [{ 'inset-shadow': i() }],
        'ring-w': [{ ring: V() }],
        'ring-w-inset': ['ring-inset'],
        'ring-color': [{ ring: i() }],
        'ring-offset-w': [{ 'ring-offset': [g, q] }],
        'ring-offset-color': [{ 'ring-offset': i() }],
        'inset-ring-w': [{ 'inset-ring': V() }],
        'inset-ring-color': [{ 'inset-ring': i() }],
        'text-shadow': [{ 'text-shadow': ['none', A, pe, ue] }],
        'text-shadow-color': [{ 'text-shadow': i() }],
        opacity: [{ opacity: [g, d, c] }],
        'mix-blend': [{ 'mix-blend': [...Y(), 'plus-darker', 'plus-lighter'] }],
        'bg-blend': [{ 'bg-blend': Y() }],
        'mask-clip': [
          { 'mask-clip': ['border', 'padding', 'content', 'fill', 'stroke', 'view'] },
          'mask-no-clip',
        ],
        'mask-composite': [{ mask: ['add', 'subtract', 'intersect', 'exclude'] }],
        'mask-image-linear-pos': [{ 'mask-linear': [g] }],
        'mask-image-linear-from-pos': [{ 'mask-linear-from': P() }],
        'mask-image-linear-to-pos': [{ 'mask-linear-to': P() }],
        'mask-image-linear-from-color': [{ 'mask-linear-from': i() }],
        'mask-image-linear-to-color': [{ 'mask-linear-to': i() }],
        'mask-image-t-from-pos': [{ 'mask-t-from': P() }],
        'mask-image-t-to-pos': [{ 'mask-t-to': P() }],
        'mask-image-t-from-color': [{ 'mask-t-from': i() }],
        'mask-image-t-to-color': [{ 'mask-t-to': i() }],
        'mask-image-r-from-pos': [{ 'mask-r-from': P() }],
        'mask-image-r-to-pos': [{ 'mask-r-to': P() }],
        'mask-image-r-from-color': [{ 'mask-r-from': i() }],
        'mask-image-r-to-color': [{ 'mask-r-to': i() }],
        'mask-image-b-from-pos': [{ 'mask-b-from': P() }],
        'mask-image-b-to-pos': [{ 'mask-b-to': P() }],
        'mask-image-b-from-color': [{ 'mask-b-from': i() }],
        'mask-image-b-to-color': [{ 'mask-b-to': i() }],
        'mask-image-l-from-pos': [{ 'mask-l-from': P() }],
        'mask-image-l-to-pos': [{ 'mask-l-to': P() }],
        'mask-image-l-from-color': [{ 'mask-l-from': i() }],
        'mask-image-l-to-color': [{ 'mask-l-to': i() }],
        'mask-image-x-from-pos': [{ 'mask-x-from': P() }],
        'mask-image-x-to-pos': [{ 'mask-x-to': P() }],
        'mask-image-x-from-color': [{ 'mask-x-from': i() }],
        'mask-image-x-to-color': [{ 'mask-x-to': i() }],
        'mask-image-y-from-pos': [{ 'mask-y-from': P() }],
        'mask-image-y-to-pos': [{ 'mask-y-to': P() }],
        'mask-image-y-from-color': [{ 'mask-y-from': i() }],
        'mask-image-y-to-color': [{ 'mask-y-to': i() }],
        'mask-image-radial': [{ 'mask-radial': [d, c] }],
        'mask-image-radial-from-pos': [{ 'mask-radial-from': P() }],
        'mask-image-radial-to-pos': [{ 'mask-radial-to': P() }],
        'mask-image-radial-from-color': [{ 'mask-radial-from': i() }],
        'mask-image-radial-to-color': [{ 'mask-radial-to': i() }],
        'mask-image-radial-shape': [{ 'mask-radial': ['circle', 'ellipse'] }],
        'mask-image-radial-size': [
          { 'mask-radial': [{ closest: ['side', 'corner'], farthest: ['side', 'corner'] }] },
        ],
        'mask-image-radial-pos': [{ 'mask-radial-at': _() }],
        'mask-image-conic-pos': [{ 'mask-conic': [g] }],
        'mask-image-conic-from-pos': [{ 'mask-conic-from': P() }],
        'mask-image-conic-to-pos': [{ 'mask-conic-to': P() }],
        'mask-image-conic-from-color': [{ 'mask-conic-from': i() }],
        'mask-image-conic-to-color': [{ 'mask-conic-to': i() }],
        'mask-mode': [{ mask: ['alpha', 'luminance', 'match'] }],
        'mask-origin': [
          { 'mask-origin': ['border', 'padding', 'content', 'fill', 'stroke', 'view'] },
        ],
        'mask-position': [{ mask: N() }],
        'mask-repeat': [{ mask: E() }],
        'mask-size': [{ mask: W() }],
        'mask-type': [{ 'mask-type': ['alpha', 'luminance'] }],
        'mask-image': [{ mask: ['none', d, c] }],
        filter: [{ filter: ['', 'none', d, c] }],
        blur: [{ blur: Se() }],
        brightness: [{ brightness: [g, d, c] }],
        contrast: [{ contrast: [g, d, c] }],
        'drop-shadow': [{ 'drop-shadow': ['', 'none', y, pe, ue] }],
        'drop-shadow-color': [{ 'drop-shadow': i() }],
        grayscale: [{ grayscale: ['', g, d, c] }],
        'hue-rotate': [{ 'hue-rotate': [g, d, c] }],
        invert: [{ invert: ['', g, d, c] }],
        saturate: [{ saturate: [g, d, c] }],
        sepia: [{ sepia: ['', g, d, c] }],
        'backdrop-filter': [{ 'backdrop-filter': ['', 'none', d, c] }],
        'backdrop-blur': [{ 'backdrop-blur': Se() }],
        'backdrop-brightness': [{ 'backdrop-brightness': [g, d, c] }],
        'backdrop-contrast': [{ 'backdrop-contrast': [g, d, c] }],
        'backdrop-grayscale': [{ 'backdrop-grayscale': ['', g, d, c] }],
        'backdrop-hue-rotate': [{ 'backdrop-hue-rotate': [g, d, c] }],
        'backdrop-invert': [{ 'backdrop-invert': ['', g, d, c] }],
        'backdrop-opacity': [{ 'backdrop-opacity': [g, d, c] }],
        'backdrop-saturate': [{ 'backdrop-saturate': [g, d, c] }],
        'backdrop-sepia': [{ 'backdrop-sepia': ['', g, d, c] }],
        'border-collapse': [{ border: ['collapse', 'separate'] }],
        'border-spacing': [{ 'border-spacing': m() }],
        'border-spacing-x': [{ 'border-spacing-x': m() }],
        'border-spacing-y': [{ 'border-spacing-y': m() }],
        'table-layout': [{ table: ['auto', 'fixed'] }],
        caption: [{ caption: ['top', 'bottom'] }],
        transition: [
          { transition: ['', 'all', 'colors', 'opacity', 'shadow', 'transform', 'none', d, c] },
        ],
        'transition-behavior': [{ transition: ['normal', 'discrete'] }],
        duration: [{ duration: [g, 'initial', d, c] }],
        ease: [{ ease: ['linear', 'initial', I, d, c] }],
        delay: [{ delay: [g, d, c] }],
        animate: [{ animate: ['none', F, d, c] }],
        backface: [{ backface: ['hidden', 'visible'] }],
        perspective: [{ perspective: [M, d, c] }],
        'perspective-origin': [{ 'perspective-origin': j() }],
        rotate: [{ rotate: ie() }],
        'rotate-x': [{ 'rotate-x': ie() }],
        'rotate-y': [{ 'rotate-y': ie() }],
        'rotate-z': [{ 'rotate-z': ie() }],
        scale: [{ scale: ce() }],
        'scale-x': [{ 'scale-x': ce() }],
        'scale-y': [{ 'scale-y': ce() }],
        'scale-z': [{ 'scale-z': ce() }],
        'scale-3d': ['scale-3d'],
        skew: [{ skew: ve() }],
        'skew-x': [{ 'skew-x': ve() }],
        'skew-y': [{ 'skew-y': ve() }],
        transform: [{ transform: [d, c, '', 'none', 'gpu', 'cpu'] }],
        'transform-origin': [{ origin: j() }],
        'transform-style': [{ transform: ['3d', 'flat'] }],
        translate: [{ translate: de() }],
        'translate-x': [{ 'translate-x': de() }],
        'translate-y': [{ 'translate-y': de() }],
        'translate-z': [{ 'translate-z': de() }],
        'translate-none': ['translate-none'],
        accent: [{ accent: i() }],
        appearance: [{ appearance: ['none', 'auto'] }],
        'caret-color': [{ caret: i() }],
        'color-scheme': [
          { scheme: ['normal', 'dark', 'light', 'light-dark', 'only-dark', 'only-light'] },
        ],
        cursor: [
          {
            cursor: [
              'auto',
              'default',
              'pointer',
              'wait',
              'text',
              'move',
              'help',
              'not-allowed',
              'none',
              'context-menu',
              'progress',
              'cell',
              'crosshair',
              'vertical-text',
              'alias',
              'copy',
              'no-drop',
              'grab',
              'grabbing',
              'all-scroll',
              'col-resize',
              'row-resize',
              'n-resize',
              'e-resize',
              's-resize',
              'w-resize',
              'ne-resize',
              'nw-resize',
              'se-resize',
              'sw-resize',
              'ew-resize',
              'ns-resize',
              'nesw-resize',
              'nwse-resize',
              'zoom-in',
              'zoom-out',
              d,
              c,
            ],
          },
        ],
        'field-sizing': [{ 'field-sizing': ['fixed', 'content'] }],
        'pointer-events': [{ 'pointer-events': ['auto', 'none'] }],
        resize: [{ resize: ['none', '', 'y', 'x'] }],
        'scroll-behavior': [{ scroll: ['auto', 'smooth'] }],
        'scroll-m': [{ 'scroll-m': m() }],
        'scroll-mx': [{ 'scroll-mx': m() }],
        'scroll-my': [{ 'scroll-my': m() }],
        'scroll-ms': [{ 'scroll-ms': m() }],
        'scroll-me': [{ 'scroll-me': m() }],
        'scroll-mt': [{ 'scroll-mt': m() }],
        'scroll-mr': [{ 'scroll-mr': m() }],
        'scroll-mb': [{ 'scroll-mb': m() }],
        'scroll-ml': [{ 'scroll-ml': m() }],
        'scroll-p': [{ 'scroll-p': m() }],
        'scroll-px': [{ 'scroll-px': m() }],
        'scroll-py': [{ 'scroll-py': m() }],
        'scroll-ps': [{ 'scroll-ps': m() }],
        'scroll-pe': [{ 'scroll-pe': m() }],
        'scroll-pt': [{ 'scroll-pt': m() }],
        'scroll-pr': [{ 'scroll-pr': m() }],
        'scroll-pb': [{ 'scroll-pb': m() }],
        'scroll-pl': [{ 'scroll-pl': m() }],
        'snap-align': [{ snap: ['start', 'end', 'center', 'align-none'] }],
        'snap-stop': [{ snap: ['normal', 'always'] }],
        'snap-type': [{ snap: ['none', 'x', 'y', 'both'] }],
        'snap-strictness': [{ snap: ['mandatory', 'proximity'] }],
        touch: [{ touch: ['auto', 'none', 'manipulation'] }],
        'touch-x': [{ 'touch-pan': ['x', 'left', 'right'] }],
        'touch-y': [{ 'touch-pan': ['y', 'up', 'down'] }],
        'touch-pz': ['touch-pinch-zoom'],
        select: [{ select: ['none', 'text', 'all', 'auto'] }],
        'will-change': [{ 'will-change': ['auto', 'scroll', 'contents', 'transform', d, c] }],
        fill: [{ fill: ['none', ...i()] }],
        'stroke-w': [{ stroke: [g, se, q, ke] }],
        stroke: [{ stroke: ['none', ...i()] }],
        'forced-color-adjust': [{ 'forced-color-adjust': ['auto', 'none'] }],
      },
      conflictingClassGroups: {
        overflow: ['overflow-x', 'overflow-y'],
        overscroll: ['overscroll-x', 'overscroll-y'],
        inset: ['inset-x', 'inset-y', 'start', 'end', 'top', 'right', 'bottom', 'left'],
        'inset-x': ['right', 'left'],
        'inset-y': ['top', 'bottom'],
        flex: ['basis', 'grow', 'shrink'],
        gap: ['gap-x', 'gap-y'],
        p: ['px', 'py', 'ps', 'pe', 'pt', 'pr', 'pb', 'pl'],
        px: ['pr', 'pl'],
        py: ['pt', 'pb'],
        m: ['mx', 'my', 'ms', 'me', 'mt', 'mr', 'mb', 'ml'],
        mx: ['mr', 'ml'],
        my: ['mt', 'mb'],
        size: ['w', 'h'],
        'font-size': ['leading'],
        'fvn-normal': [
          'fvn-ordinal',
          'fvn-slashed-zero',
          'fvn-figure',
          'fvn-spacing',
          'fvn-fraction',
        ],
        'fvn-ordinal': ['fvn-normal'],
        'fvn-slashed-zero': ['fvn-normal'],
        'fvn-figure': ['fvn-normal'],
        'fvn-spacing': ['fvn-normal'],
        'fvn-fraction': ['fvn-normal'],
        'line-clamp': ['display', 'overflow'],
        rounded: [
          'rounded-s',
          'rounded-e',
          'rounded-t',
          'rounded-r',
          'rounded-b',
          'rounded-l',
          'rounded-ss',
          'rounded-se',
          'rounded-ee',
          'rounded-es',
          'rounded-tl',
          'rounded-tr',
          'rounded-br',
          'rounded-bl',
        ],
        'rounded-s': ['rounded-ss', 'rounded-es'],
        'rounded-e': ['rounded-se', 'rounded-ee'],
        'rounded-t': ['rounded-tl', 'rounded-tr'],
        'rounded-r': ['rounded-tr', 'rounded-br'],
        'rounded-b': ['rounded-br', 'rounded-bl'],
        'rounded-l': ['rounded-tl', 'rounded-bl'],
        'border-spacing': ['border-spacing-x', 'border-spacing-y'],
        'border-w': [
          'border-w-x',
          'border-w-y',
          'border-w-s',
          'border-w-e',
          'border-w-t',
          'border-w-r',
          'border-w-b',
          'border-w-l',
        ],
        'border-w-x': ['border-w-r', 'border-w-l'],
        'border-w-y': ['border-w-t', 'border-w-b'],
        'border-color': [
          'border-color-x',
          'border-color-y',
          'border-color-s',
          'border-color-e',
          'border-color-t',
          'border-color-r',
          'border-color-b',
          'border-color-l',
        ],
        'border-color-x': ['border-color-r', 'border-color-l'],
        'border-color-y': ['border-color-t', 'border-color-b'],
        translate: ['translate-x', 'translate-y', 'translate-none'],
        'translate-none': ['translate', 'translate-x', 'translate-y', 'translate-z'],
        'scroll-m': [
          'scroll-mx',
          'scroll-my',
          'scroll-ms',
          'scroll-me',
          'scroll-mt',
          'scroll-mr',
          'scroll-mb',
          'scroll-ml',
        ],
        'scroll-mx': ['scroll-mr', 'scroll-ml'],
        'scroll-my': ['scroll-mt', 'scroll-mb'],
        'scroll-p': [
          'scroll-px',
          'scroll-py',
          'scroll-ps',
          'scroll-pe',
          'scroll-pt',
          'scroll-pr',
          'scroll-pb',
          'scroll-pl',
        ],
        'scroll-px': ['scroll-pr', 'scroll-pl'],
        'scroll-py': ['scroll-pt', 'scroll-pb'],
        touch: ['touch-x', 'touch-y', 'touch-pz'],
        'touch-x': ['touch'],
        'touch-y': ['touch'],
        'touch-pz': ['touch'],
      },
      conflictingClassGroupModifiers: { 'font-size': ['leading'] },
      orderSensitiveModifiers: [
        '*',
        '**',
        'after',
        'backdrop',
        'before',
        'details-content',
        'file',
        'first-letter',
        'first-line',
        'marker',
        'placeholder',
        'selection',
      ],
    };
  },
  Dr = (
    e,
    { cacheSize: o, prefix: t, experimentalParseClassName: r, extend: n = {}, override: s = {} }
  ) => (
    ne(e, 'cacheSize', o),
    ne(e, 'prefix', t),
    ne(e, 'experimentalParseClassName', r),
    me(e.theme, s.theme),
    me(e.classGroups, s.classGroups),
    me(e.conflictingClassGroups, s.conflictingClassGroups),
    me(e.conflictingClassGroupModifiers, s.conflictingClassGroupModifiers),
    ne(e, 'orderSensitiveModifiers', s.orderSensitiveModifiers),
    fe(e.theme, n.theme),
    fe(e.classGroups, n.classGroups),
    fe(e.conflictingClassGroups, n.conflictingClassGroups),
    fe(e.conflictingClassGroupModifiers, n.conflictingClassGroupModifiers),
    Ye(e, n, 'orderSensitiveModifiers'),
    e
  ),
  ne = (e, o, t) => {
    t !== void 0 && (e[o] = t);
  },
  me = (e, o) => {
    if (o) for (const t in o) ne(e, t, o[t]);
  },
  fe = (e, o) => {
    if (o) for (const t in o) Ye(e, o, t);
  },
  Ye = (e, o, t) => {
    const r = o[t];
    r !== void 0 && (e[t] = e[t] ? e[t].concat(r) : r);
  },
  Wr = (e, ...o) => (typeof e == 'function' ? Ne(Ve, e, ...o) : Ne(() => Dr(Ve(), e), ...o)),
  Hr = Ne(Ve);
var Ur = (e) =>
    B(e)
      ? Hr
      : Wr({
          ...e,
          extend: {
            theme: e.theme,
            classGroups: e.classGroups,
            conflictingClassGroupModifiers: e.conflictingClassGroupModifiers,
            conflictingClassGroups: e.conflictingClassGroups,
            ...e.extend,
          },
        }),
  Zr = (e, o) => {
    const t = xe(e);
    return !t || !(o?.twMerge ?? !0)
      ? t
      : ((!Z.cachedTwMerge || Z.didTwMergeConfigChange) &&
          ((Z.didTwMergeConfigChange = !1), (Z.cachedTwMerge = Ur(Z.cachedTwMergeConfig))),
        Z.cachedTwMerge(t) || void 0);
  },
  $r =
    (...e) =>
    (o) =>
      Zr(e, o),
  { tv: re } = tr($r);
const Kr = re({
    base: [
      'flex items-center justify-center',
      'h-[44px]',
      'px-[var(--padding-xl)] py-[var(--padding-m)]',
      'gap-[var(--spacing-xxs)]',
      'rounded-[var(--radius-l)]',
      'typo-body-1',
      'transition-colors',
      'focus:outline-none',
      'cursor-pointer',
    ],
    variants: {
      variant: {
        fill: [
          'bg-[var(--color-gray-900)] text-[var(--color-white)]',
          'hover:bg-[var(--color-gray-500)]',
          'focus:bg-[var(--color-gray-600)] focus:text-[var(--color-white)]',
          'disabled:bg-[var(--color-gray-200)]',
          'disabled:text-[var(--color-gray-400)]',
          'disabled:cursor-not-allowed',
        ],
        outline: [
          'bg-transparent',
          'border-2',
          'border-[var(--color-gray-900)]',
          'text-[var(--color-gray-900)]',
          'hover:border-[var(--color-gray-500)]',
          'hover:text-[var(--color-gray-500)]',
          'focus:border-[var(--color-gray-600)]',
          'focus:text-[var(--color-gray-600)]',
          'disabled:border-[var(--color-gray-300)]',
          'disabled:text-[var(--color-gray-400)]',
          'disabled:cursor-not-allowed',
        ],
      },
      size: { default: ['w-[163px]'], auto: ['w-auto'] },
    },
    defaultVariants: { variant: 'fill', size: 'default' },
  }),
  ae = ({ children: e, variant: o, size: t, className: r, onMouseUp: n, ...s }) => {
    const l = (p) => {
      (n?.(p), p.currentTarget.blur());
    };
    return a.jsx('button', {
      type: 'button',
      className: Kr({ variant: o, size: t, className: r }),
      onMouseUp: l,
      ...s,
      children: e,
    });
  },
  Yr = re({
    base: [
      'group',
      'flex flex-col items-center',
      'w-[204px] h-[299px]',
      'gap-[14px]',
      'bg-white',
      'cursor-pointer',
    ],
    slots: {
      imageWrapper: [
        'relative',
        'flex',
        'p-[var(--padding-s)]',
        'items-start',
        'gap-[10px]',
        'flex-1',
        'self-stretch',
        'rounded-[var(--radius-l)]',
        'overflow-hidden',
      ],
      image: ['w-full h-full object-cover', 'rounded-[var(--radius-l)]'],
      overlay: [
        'absolute inset-0',
        'rounded-[var(--radius-l)]',
        'bg-white/20',
        'opacity-0',
        'transition-opacity',
        'pointer-events-none',
        'group-hover:opacity-100',
      ],
      title: [
        'h-[48px]',
        'self-stretch',
        'overflow-hidden',
        'line-clamp-2',
        'typo-body-1',
        'text-black',
      ],
      price: ['self-stretch', 'typo-body-2', 'font-semibold', 'text-black'],
      date: ['self-stretch', 'typo-caption-2', 'font-normal', 'text-black'],
      textWrapper: 'flex flex-col gap-1',
    },
  }),
  {
    base: qr,
    imageWrapper: Xr,
    image: Jr,
    overlay: Qr,
    title: et,
    price: rt,
    date: tt,
    textWrapper: ot,
  } = Yr(),
  st = ({ imageSrc: e, titleText: o, priceText: t, dateText: r, className: n, ...s }) =>
    a.jsxs('div', {
      ...s,
      className: qr({ className: n }),
      children: [
        a.jsxs('div', {
          className: Xr(),
          children: [
            a.jsx('img', { src: e, alt: '', className: Jr() }),
            a.jsx('div', { className: Qr() }),
          ],
        }),
        a.jsxs('div', {
          className: ot(),
          children: [
            a.jsx('p', { className: et(), children: o }),
            a.jsx('p', { className: rt(), children: t }),
            a.jsx('span', { className: tt(), children: r }),
          ],
        }),
      ],
    }),
  nt = (e) =>
    L.createElement(
      'svg',
      {
        width: 14,
        height: 14,
        viewBox: '0 0 14 14',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
        ...e,
      },
      L.createElement('path', {
        d: 'M11.6667 3.79163L5.24999 10.2083L2.33333 7.29163',
        stroke: 'currentColor',
        strokeWidth: 1.5,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      })
    ),
  at = re({
    slots: {
      root: [
        'inline-flex items-center',
        'gap-[var(--spacing-xxs)]',
        'cursor-pointer',
        'select-none',
      ],
      box: [
        'flex items-center justify-center',
        'w-[20px] h-[20px]',
        'rounded-[4px]',
        'border',
        'transition-colors duration-[250ms] ease-out',
        'bg-transparent',
        'border-[var(--color-gray-300)]',
      ],
      icon: [
        'w-[14px] h-[14px]',
        'flex items-center justify-center',
        'text-[var(--color-white)]',
        '[&_path]:stroke-[2px]',
        'hidden',
      ],
      label: ['typo-caption-1', 'text-[var(--color-gray-600)]'],
    },
    variants: {
      checked: {
        true: {
          box: ['bg-[var(--color-green-600)]', 'border-[var(--color-green-600)]'],
          icon: ['block'],
        },
      },
      focus: { true: { box: ['ring-2', 'ring-[var(--color-green-600)]', 'ring-offset-2'] } },
      disabled: {
        true: {
          root: ['cursor-not-allowed'],
          box: ['bg-[var(--color-gray-300)]', 'border-[var(--color-gray-300)]'],
          label: ['text-[var(--color-gray-600)]'],
        },
      },
    },
  }),
  ge = ({
    label: e,
    checked: o,
    defaultChecked: t = !1,
    disabled: r,
    focus: n,
    className: s,
    onChange: l,
    onFocus: p,
    onBlur: u,
    ...f
  }) => {
    const [k, C] = L.useState(t),
      [A, y] = L.useState(!1),
      T = o !== void 0,
      M = T ? o : k,
      S = n ?? A,
      I = (j) => {
        (T || C(j.target.checked), l?.(j));
      },
      F = (j) => {
        (n === void 0 && y(!0), p?.(j));
      },
      G = (j) => {
        (n === void 0 && y(!1), u?.(j));
      },
      _ = at({ checked: M, disabled: r, focus: S });
    return a.jsxs('label', {
      className: _.root({ className: s }),
      children: [
        a.jsx('input', {
          type: 'checkbox',
          className: 'sr-only',
          checked: M,
          disabled: r,
          onChange: I,
          onFocus: F,
          onBlur: G,
          ...(e && { 'aria-label': e }),
          ...f,
        }),
        a.jsx('span', { className: _.box(), children: a.jsx(nt, { className: _.icon() }) }),
        e && a.jsx('span', { className: _.label(), children: e }),
      ],
    });
  },
  lt = (e) =>
    L.createElement(
      'svg',
      {
        width: 192,
        height: 36,
        viewBox: '0 0 192 36',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
        ...e,
      },
      L.createElement(
        'g',
        { clipPath: 'url(#clip0_266_212)' },
        L.createElement('path', {
          d: 'M40.4733 3.70102C43.4881 1.23367 47.4697 0 52.418 0C57.3664 0 61.3312 1.25068 64.3126 3.7496C67.3275 6.21695 68.8337 9.69941 68.8337 14.1994V21.9997C68.8337 26.5677 67.3418 30.0502 64.3604 32.4495C61.4124 34.8173 57.4308 36 52.4157 36C47.4005 36 43.4046 34.8173 40.4232 32.4495C37.4752 30.0502 36 26.5653 36 21.9997V14.1994C36 9.66541 37.4919 6.16595 40.4733 3.6986V3.70102ZM49.7637 25.2539C50.4201 25.9217 51.3033 26.2545 52.418 26.2545C53.5328 26.2545 54.416 25.9217 55.0724 25.2539C55.7289 24.5861 56.0559 23.571 56.0559 22.2037V13.8036C56.0559 12.4703 55.7289 11.4698 55.0724 10.8044C54.416 10.105 53.5328 9.75526 52.418 9.75526C51.3033 9.75526 50.4201 10.105 49.7637 10.8044C49.1072 11.4722 48.7802 12.4703 48.7802 13.8036V22.2037C48.7802 23.571 49.1072 24.5861 49.7637 25.2539ZM76.7372 3.70102C79.752 1.23367 83.7336 0 88.6819 0C93.6302 0 97.5951 1.25068 100.576 3.7496C103.591 6.21695 105.098 9.69941 105.098 14.1994V21.9997C105.098 26.5677 103.606 30.0502 100.624 32.4495C97.6763 34.8173 93.6947 36 88.6795 36C83.6643 36 79.6684 34.8173 76.687 32.4495C73.739 30.0502 72.2639 26.5653 72.2639 21.9997V14.1994C72.2639 9.66541 73.7558 6.16595 76.7372 3.6986V3.70102ZM86.0275 25.2539C86.6839 25.9217 87.5672 26.2545 88.6819 26.2545C89.7966 26.2545 90.6798 25.9217 91.3363 25.2539C91.9927 24.5861 92.3197 23.571 92.3197 22.2037V13.8036C92.3197 12.4703 91.9927 11.4698 91.3363 10.8044C90.6798 10.105 89.7966 9.75526 88.6819 9.75526C87.5672 9.75526 86.6839 10.105 86.0275 10.8044C85.3711 11.4722 85.044 12.4703 85.044 13.8036V22.2037C85.044 23.571 85.3711 24.5861 86.0275 25.2539ZM110.838 0.500269H125.485C130.204 0.500269 133.89 1.53481 136.544 3.60146C139.199 5.66811 140.526 8.71829 140.526 12.752C140.526 16.7858 139.199 19.7704 136.544 21.7035C133.923 23.6365 130.235 24.6031 125.485 24.6031H122.291V34.1543C122.291 34.521 122.16 34.8368 121.897 35.1039C121.635 35.371 121.325 35.5046 120.964 35.5046H110.838C110.478 35.5046 110.168 35.371 109.905 35.1039C109.642 34.8368 109.511 34.521 109.511 34.1543V1.85051C109.511 1.48381 109.642 1.16811 109.905 0.900971C110.168 0.633837 110.478 0.500269 110.838 0.500269ZM122.046 9.8014V15.3529H125.485C126.075 15.3529 126.6 15.1368 127.058 14.7021C127.517 14.2358 127.746 13.585 127.746 12.752C127.746 11.919 127.567 11.2196 127.206 10.6514C126.846 10.0831 126.273 9.8014 125.485 9.8014H122.046ZM155.545 35.5046H145.52C145.159 35.5046 144.849 35.371 144.586 35.1039C144.324 34.8368 144.192 34.521 144.192 34.1543V1.85051C144.192 1.48381 144.324 1.16811 144.586 0.900971C144.849 0.633837 145.159 0.500269 145.52 0.500269H155.545C155.906 0.500269 156.216 0.633837 156.479 0.900971C156.741 1.16811 156.872 1.48381 156.872 1.85051V34.1543C156.872 34.521 156.741 34.8368 156.479 35.1039C156.216 35.371 155.906 35.5046 155.545 35.5046ZM161.871 0.500269H190.673C191.033 0.500269 191.344 0.633837 191.606 0.900971C191.869 1.16811 192 1.48381 192 1.85051V9.90097C192 10.2677 191.869 10.5834 191.606 10.8505C191.344 11.1176 191.033 11.2512 190.673 11.2512H182.514V34.1519C182.514 34.5186 182.383 34.8343 182.12 35.1015C181.857 35.3686 181.547 35.5022 181.187 35.5022H171.357C170.996 35.5022 170.686 35.3686 170.424 35.1015C170.161 34.8343 170.03 34.5186 170.03 34.1519V11.2512H161.871C161.51 11.2512 161.2 11.1176 160.937 10.8505C160.675 10.5834 160.544 10.2677 160.544 9.90097V1.85051C160.544 1.48381 160.675 1.16811 160.937 0.900971C161.2 0.633837 161.51 0.500269 161.871 0.500269Z',
          fill: 'black',
        }),
        L.createElement('path', {
          d: 'M7 15C10.866 15 14 11.866 14 8C14 4.13401 10.866 1 7 1C3.13401 1 0 4.13401 0 8C0 11.866 3.13401 15 7 15Z',
          fill: '#13FFD0',
        }),
        L.createElement('path', {
          d: 'M12 32V23C12.4369 23.3486 14.0661 24.5641 16.5 24.5641C18.9339 24.5641 20.5631 23.3486 21 23V32C20.4397 31.6227 18.8179 30.6317 16.5 30.6317C14.1821 30.6317 12.5603 31.6227 12 32Z',
          fill: 'black',
        }),
        L.createElement('path', {
          d: 'M26.5 35C30.6421 35 34 31.866 34 28C34 24.134 30.6421 21 26.5 21C22.3579 21 19 24.134 19 28C19 31.866 22.3579 35 26.5 35Z',
          fill: 'black',
        }),
        L.createElement('path', {
          d: 'M7 35C10.866 35 14 31.866 14 28C14 24.134 10.866 21 7 21C3.13401 21 0 24.134 0 28C0 31.866 3.13401 35 7 35Z',
          fill: 'black',
        })
      ),
      L.createElement(
        'defs',
        null,
        L.createElement(
          'clipPath',
          { id: 'clip0_266_212' },
          L.createElement('rect', { width: 192, height: 36, fill: 'white' })
        )
      )
    ),
  it = re({
    base: [
      'flex',
      'w-full',
      'max-w-[1440px]',
      'mx-auto',
      'px-[120px] py-[var(--margin-l)]',
      'justify-between',
      'items-center',
      'bg-white',
    ],
    slots: {
      rightSection: ['flex', 'items-center', 'gap-[93px]'],
      innerSection: ['flex', 'items-center', 'gap-[56px]'],
      navItem: ['text-center', 'typo-body-1', 'text-[var(--color-gray-900)]', 'cursor-pointer'],
    },
  }),
  { base: ct, rightSection: dt, innerSection: ut, navItem: pt } = it(),
  mt = [
    { id: 'buy', label: '구매하기' },
    { id: 'sell', label: '판매하기' },
    { id: 'repair', label: '수리점찾기' },
    { id: 'chatbot', label: '챗봇' },
    { id: 'mypage', label: '마이페이지' },
  ],
  ft = ({ className: e, ...o }) =>
    a.jsxs('header', {
      ...o,
      className: ct({ className: e }),
      children: [
        a.jsx(lt, {}),
        a.jsxs('div', {
          className: dt(),
          children: [
            a.jsx('nav', {
              className: ut(),
              children: mt.map((t) => a.jsx('span', { className: pt(), children: t.label }, t.id)),
            }),
            a.jsx(ae, { variant: 'fill', size: 'auto', children: '로그인' }),
          ],
        }),
      ],
    }),
  gt = re({
    base: [
      'relative',
      'flex items-center justify-center',
      'overflow-hidden',
      'rounded-full',
      'bg-[var(--color-gray-200)]',
      'bg-center bg-cover bg-no-repeat',
    ],
    variants: { size: { sm: ['w-[44px]', 'h-[44px]'], lg: ['w-[152px]', 'h-[152px]'] } },
    defaultVariants: { size: 'sm' },
  }),
  he = ({ size: e, imageUrl: o, className: t, style: r, ...n }) =>
    a.jsx('div', {
      ...n,
      className: gt({ size: e, className: t }),
      style: { ...(o && { backgroundImage: `url(${o})` }), ...r },
    }),
  ht = re({
    slots: {
      root: [
        'inline-flex items-center',
        'gap-[var(--spacing-xxs)]',
        'cursor-pointer',
        'select-none',
      ],
      circle: [
        'flex items-center justify-center',
        'w-[20px] h-[20px]',
        'rounded-full',
        'border',
        'border-[var(--color-gray-300)]',
        'transition-colors duration-[250ms] ease-out',
      ],
      dot: ['w-[10px] h-[10px]', 'rounded-full', 'hidden'],
      label: ['typo-caption-1', 'text-[var(--color-gray-500)]'],
    },
    variants: {
      checked: {
        true: {
          circle: ['border-[var(--color-green-600)]'],
          dot: ['block', 'bg-[var(--color-green-600)]'],
        },
      },
      focus: { true: { circle: ['ring-2', 'ring-[var(--color-green-600)]', 'ring-offset-2'] } },
      disabled: {
        true: {
          root: ['cursor-not-allowed'],
          circle: ['border-[var(--color-gray-300)]'],
          dot: ['bg-[var(--color-gray-300)]'],
          label: ['text-[var(--color-gray-500)]', 'line-through'],
        },
      },
    },
  }),
  be = ({
    label: e,
    checked: o,
    disabled: t,
    focus: r,
    className: n,
    onFocus: s,
    onBlur: l,
    ...p
  }) => {
    const [u, f] = L.useState(!1),
      k = r ?? u,
      C = (T) => {
        (r === void 0 && f(!0), s?.(T));
      },
      A = (T) => {
        (r === void 0 && f(!1), l?.(T));
      },
      y = ht({ checked: o, disabled: t, focus: k });
    return a.jsxs('label', {
      className: y.root({ className: n }),
      children: [
        a.jsx('input', {
          type: 'radio',
          className: 'sr-only',
          checked: o,
          disabled: t,
          onFocus: C,
          onBlur: A,
          ...(e && { 'aria-label': e }),
          ...p,
        }),
        a.jsx('span', { className: y.circle(), children: a.jsx('span', { className: y.dot() }) }),
        e && a.jsx('span', { className: y.label(), children: e }),
      ],
    });
  };
function xt() {
  return a.jsxs('div', {
    className: 'flex flex-col gap-6 p-8',
    children: [
      a.jsx('h1', { className: 'typo-title-2', children: 'UI Playground' }),
      a.jsxs('section', {
        className: 'flex flex-col gap-4',
        children: [a.jsx('h2', { className: 'typo-body-1', children: 'Header' }), a.jsx(ft, {})],
      }),
      a.jsxs('section', {
        className: 'flex flex-col gap-4',
        children: [
          a.jsx('h2', { className: 'typo-body-1', children: 'Button' }),
          a.jsx('p', {
            className: 'typo-caption-2 text-gray-600',
            children:
              'Hover와 Focus 상태를 확인하려면 마우스를 올리거나 Tab 키로 포커스를 이동하세요.',
          }),
          a.jsxs('div', {
            className: 'flex flex-col gap-4',
            children: [
              a.jsxs('div', {
                className: 'flex items-center gap-4',
                children: [
                  a.jsx('span', { className: 'typo-caption-1 w-24', children: 'Fill' }),
                  a.jsx(ae, { variant: 'fill', children: 'Default' }),
                  a.jsx(ae, { variant: 'fill', disabled: !0, children: 'Disabled' }),
                ],
              }),
              a.jsxs('div', {
                className: 'flex items-center gap-4',
                children: [
                  a.jsx('span', { className: 'typo-caption-1 w-24', children: 'Outline' }),
                  a.jsx(ae, { variant: 'outline', children: 'Default' }),
                  a.jsx(ae, { variant: 'outline', disabled: !0, children: 'Disabled' }),
                ],
              }),
            ],
          }),
        ],
      }),
      a.jsxs('section', {
        className: 'flex flex-col gap-4',
        children: [
          a.jsx('h2', { className: 'typo-body-1', children: 'Checkbox' }),
          a.jsxs('div', {
            className: 'flex flex-col gap-2',
            children: [
              a.jsx(ge, { label: 'Default' }),
              a.jsx(ge, { checked: !0, label: 'Checked' }),
              a.jsx(ge, { disabled: !0, label: 'Disabled' }),
              a.jsx(ge, { checked: !0, disabled: !0, label: 'Checked + Disabled' }),
            ],
          }),
        ],
      }),
      a.jsxs('section', {
        className: 'flex flex-col gap-4',
        children: [
          a.jsx('h2', { className: 'typo-body-1', children: 'Radio Button' }),
          a.jsxs('div', {
            className: 'flex flex-col gap-2',
            children: [
              a.jsx(be, { label: 'Default' }),
              a.jsx(be, { checked: !0, label: 'Selected' }),
              a.jsx(be, { disabled: !0, label: 'Disabled' }),
              a.jsx(be, { checked: !0, disabled: !0, label: 'Selected + Disabled' }),
            ],
          }),
        ],
      }),
      a.jsxs('section', {
        className: 'flex flex-col gap-4',
        children: [
          a.jsx('h2', { className: 'typo-body-1', children: 'Profile' }),
          a.jsx('p', {
            className: 'typo-caption-2 text-gray-600',
            children: 'size variant 및 placeholder 상태를 확인합니다.',
          }),
          a.jsxs('div', {
            className: 'flex items-center gap-10',
            children: [
              a.jsxs('div', {
                className: 'flex flex-col items-center gap-2',
                children: [
                  a.jsx(he, { size: 'sm', imageUrl: '/profile-sample.jpg' }),
                  a.jsx('span', { className: 'typo-caption-2', children: 'Small Image' }),
                ],
              }),
              a.jsxs('div', {
                className: 'flex flex-col items-center gap-2',
                children: [
                  a.jsx(he, { size: 'lg', imageUrl: '/profile-sample.jpg' }),
                  a.jsx('span', { className: 'typo-caption-2', children: 'Large Image' }),
                ],
              }),
              a.jsxs('div', {
                className: 'flex flex-col items-center gap-2',
                children: [
                  a.jsx(he, { size: 'sm' }),
                  a.jsx('span', {
                    className: 'typo-caption-2 text-gray-500',
                    children: 'Small Placeholder',
                  }),
                ],
              }),
              a.jsxs('div', {
                className: 'flex flex-col items-center gap-2',
                children: [
                  a.jsx(he, { size: 'lg' }),
                  a.jsx('span', {
                    className: 'typo-caption-2 text-gray-500',
                    children: 'Large Placeholder',
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      a.jsxs('section', {
        className: 'flex flex-col gap-4',
        children: [
          a.jsx('h2', { className: 'typo-body-1', children: 'Card' }),
          a.jsx(st, {
            imageSrc: '/iphone11.png',
            titleText: 'Title 인데 제목이 정말 길 경우에는 두줄 까지만 보이고, 뒤엔 점 처리',
            priceText: '0,000원',
            dateText: '1일 전',
          }),
        ],
      }),
    ],
  });
}
export { xt as default };
