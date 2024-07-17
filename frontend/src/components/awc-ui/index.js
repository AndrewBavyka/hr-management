/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const br = globalThis,
  io =
    br.ShadowRoot &&
    (br.ShadyCSS === void 0 || br.ShadyCSS.nativeShadow) &&
    'adoptedStyleSheets' in Document.prototype &&
    'replace' in CSSStyleSheet.prototype,
  so = Symbol(),
  Mo = /* @__PURE__ */ new WeakMap()
let ni = class {
  constructor(e, r, i) {
    if (((this._$cssResult$ = !0), i !== so))
      throw Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.')
    ;(this.cssText = e), (this.t = r)
  }
  get styleSheet() {
    let e = this.o
    const r = this.t
    if (io && e === void 0) {
      const i = r !== void 0 && r.length === 1
      i && (e = Mo.get(r)),
        e === void 0 &&
          ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Mo.set(r, e))
    }
    return e
  }
  toString() {
    return this.cssText
  }
}
const ns = (t) => new ni(typeof t == 'string' ? t : t + '', void 0, so),
  w = (t, ...e) => {
    const r =
      t.length === 1
        ? t[0]
        : e.reduce(
            (i, o, s) =>
              i +
              ((a) => {
                if (a._$cssResult$ === !0) return a.cssText
                if (typeof a == 'number') return a
                throw Error(
                  "Value passed to 'css' function must be a 'css' function result: " +
                    a +
                    ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security."
                )
              })(o) +
              t[s + 1],
            t[0]
          )
    return new ni(r, t, so)
  },
  ls = (t, e) => {
    if (io) t.adoptedStyleSheets = e.map((r) => (r instanceof CSSStyleSheet ? r : r.styleSheet))
    else
      for (const r of e) {
        const i = document.createElement('style'),
          o = br.litNonce
        o !== void 0 && i.setAttribute('nonce', o), (i.textContent = r.cssText), t.appendChild(i)
      }
  },
  jo = io
    ? (t) => t
    : (t) =>
        t instanceof CSSStyleSheet
          ? ((e) => {
              let r = ''
              for (const i of e.cssRules) r += i.cssText
              return ns(r)
            })(t)
          : t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const {
    is: cs,
    defineProperty: ds,
    getOwnPropertyDescriptor: ps,
    getOwnPropertyNames: hs,
    getOwnPropertySymbols: us,
    getPrototypeOf: vs
  } = Object,
  Gt = globalThis,
  zo = Gt.trustedTypes,
  gs = zo ? zo.emptyScript : '',
  Ur = Gt.reactiveElementPolyfillSupport,
  je = (t, e) => t,
  mr = {
    toAttribute(t, e) {
      switch (e) {
        case Boolean:
          t = t ? gs : null
          break
        case Object:
        case Array:
          t = t == null ? t : JSON.stringify(t)
      }
      return t
    },
    fromAttribute(t, e) {
      let r = t
      switch (e) {
        case Boolean:
          r = t !== null
          break
        case Number:
          r = t === null ? null : Number(t)
          break
        case Object:
        case Array:
          try {
            r = JSON.parse(t)
          } catch {
            r = null
          }
      }
      return r
    }
  },
  ao = (t, e) => !cs(t, e),
  Ro = { attribute: !0, type: String, converter: mr, reflect: !1, hasChanged: ao }
Symbol.metadata ?? (Symbol.metadata = Symbol('metadata')),
  Gt.litPropertyMetadata ?? (Gt.litPropertyMetadata = /* @__PURE__ */ new WeakMap())
let me = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e)
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()]
  }
  static createProperty(e, r = Ro) {
    if (
      (r.state && (r.attribute = !1), this._$Ei(), this.elementProperties.set(e, r), !r.noAccessor)
    ) {
      const i = Symbol(),
        o = this.getPropertyDescriptor(e, i, r)
      o !== void 0 && ds(this.prototype, e, o)
    }
  }
  static getPropertyDescriptor(e, r, i) {
    const { get: o, set: s } = ps(this.prototype, e) ?? {
      get() {
        return this[r]
      },
      set(a) {
        this[r] = a
      }
    }
    return {
      get() {
        return o == null ? void 0 : o.call(this)
      },
      set(a) {
        const d = o == null ? void 0 : o.call(this)
        s.call(this, a), this.requestUpdate(e, d, i)
      },
      configurable: !0,
      enumerable: !0
    }
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Ro
  }
  static _$Ei() {
    if (this.hasOwnProperty(je('elementProperties'))) return
    const e = vs(this)
    e.finalize(),
      e.l !== void 0 && (this.l = [...e.l]),
      (this.elementProperties = new Map(e.elementProperties))
  }
  static finalize() {
    if (this.hasOwnProperty(je('finalized'))) return
    if (((this.finalized = !0), this._$Ei(), this.hasOwnProperty(je('properties')))) {
      const r = this.properties,
        i = [...hs(r), ...us(r)]
      for (const o of i) this.createProperty(o, r[o])
    }
    const e = this[Symbol.metadata]
    if (e !== null) {
      const r = litPropertyMetadata.get(e)
      if (r !== void 0) for (const [i, o] of r) this.elementProperties.set(i, o)
    }
    this._$Eh = /* @__PURE__ */ new Map()
    for (const [r, i] of this.elementProperties) {
      const o = this._$Eu(r, i)
      o !== void 0 && this._$Eh.set(o, r)
    }
    this.elementStyles = this.finalizeStyles(this.styles)
  }
  static finalizeStyles(e) {
    const r = []
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse())
      for (const o of i) r.unshift(jo(o))
    } else e !== void 0 && r.push(jo(e))
    return r
  }
  static _$Eu(e, r) {
    const i = r.attribute
    return i === !1
      ? void 0
      : typeof i == 'string'
        ? i
        : typeof e == 'string'
          ? e.toLowerCase()
          : void 0
  }
  constructor() {
    super(),
      (this._$Ep = void 0),
      (this.isUpdatePending = !1),
      (this.hasUpdated = !1),
      (this._$Em = null),
      this._$Ev()
  }
  _$Ev() {
    var e
    ;(this._$ES = new Promise((r) => (this.enableUpdating = r))),
      (this._$AL = /* @__PURE__ */ new Map()),
      this._$E_(),
      this.requestUpdate(),
      (e = this.constructor.l) == null || e.forEach((r) => r(this))
  }
  addController(e) {
    var r
    ;(this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e),
      this.renderRoot !== void 0 && this.isConnected && ((r = e.hostConnected) == null || r.call(e))
  }
  removeController(e) {
    var r
    ;(r = this._$EO) == null || r.delete(e)
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(),
      r = this.constructor.elementProperties
    for (const i of r.keys()) this.hasOwnProperty(i) && (e.set(i, this[i]), delete this[i])
    e.size > 0 && (this._$Ep = e)
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions)
    return ls(e, this.constructor.elementStyles), e
  }
  connectedCallback() {
    var e
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()),
      this.enableUpdating(!0),
      (e = this._$EO) == null ||
        e.forEach((r) => {
          var i
          return (i = r.hostConnected) == null ? void 0 : i.call(r)
        })
  }
  enableUpdating(e) {}
  disconnectedCallback() {
    var e
    ;(e = this._$EO) == null ||
      e.forEach((r) => {
        var i
        return (i = r.hostDisconnected) == null ? void 0 : i.call(r)
      })
  }
  attributeChangedCallback(e, r, i) {
    this._$AK(e, i)
  }
  _$EC(e, r) {
    var s
    const i = this.constructor.elementProperties.get(e),
      o = this.constructor._$Eu(e, i)
    if (o !== void 0 && i.reflect === !0) {
      const a = (
        ((s = i.converter) == null ? void 0 : s.toAttribute) !== void 0 ? i.converter : mr
      ).toAttribute(r, i.type)
      ;(this._$Em = e),
        a == null ? this.removeAttribute(o) : this.setAttribute(o, a),
        (this._$Em = null)
    }
  }
  _$AK(e, r) {
    var s
    const i = this.constructor,
      o = i._$Eh.get(e)
    if (o !== void 0 && this._$Em !== o) {
      const a = i.getPropertyOptions(o),
        d =
          typeof a.converter == 'function'
            ? { fromAttribute: a.converter }
            : ((s = a.converter) == null ? void 0 : s.fromAttribute) !== void 0
              ? a.converter
              : mr
      ;(this._$Em = o), (this[o] = d.fromAttribute(r, a.type)), (this._$Em = null)
    }
  }
  requestUpdate(e, r, i) {
    if (e !== void 0) {
      if ((i ?? (i = this.constructor.getPropertyOptions(e)), !(i.hasChanged ?? ao)(this[e], r)))
        return
      this.P(e, r, i)
    }
    this.isUpdatePending === !1 && (this._$ES = this._$ET())
  }
  P(e, r, i) {
    this._$AL.has(e) || this._$AL.set(e, r),
      i.reflect === !0 &&
        this._$Em !== e &&
        (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(e)
  }
  async _$ET() {
    this.isUpdatePending = !0
    try {
      await this._$ES
    } catch (r) {
      Promise.reject(r)
    }
    const e = this.scheduleUpdate()
    return e != null && (await e), !this.isUpdatePending
  }
  scheduleUpdate() {
    return this.performUpdate()
  }
  performUpdate() {
    var i
    if (!this.isUpdatePending) return
    if (!this.hasUpdated) {
      if ((this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep)) {
        for (const [s, a] of this._$Ep) this[s] = a
        this._$Ep = void 0
      }
      const o = this.constructor.elementProperties
      if (o.size > 0)
        for (const [s, a] of o)
          a.wrapped !== !0 || this._$AL.has(s) || this[s] === void 0 || this.P(s, this[s], a)
    }
    let e = !1
    const r = this._$AL
    try {
      ;(e = this.shouldUpdate(r)),
        e
          ? (this.willUpdate(r),
            (i = this._$EO) == null ||
              i.forEach((o) => {
                var s
                return (s = o.hostUpdate) == null ? void 0 : s.call(o)
              }),
            this.update(r))
          : this._$EU()
    } catch (o) {
      throw ((e = !1), this._$EU(), o)
    }
    e && this._$AE(r)
  }
  willUpdate(e) {}
  _$AE(e) {
    var r
    ;(r = this._$EO) == null ||
      r.forEach((i) => {
        var o
        return (o = i.hostUpdated) == null ? void 0 : o.call(i)
      }),
      this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(e)),
      this.updated(e)
  }
  _$EU() {
    ;(this._$AL = /* @__PURE__ */ new Map()), (this.isUpdatePending = !1)
  }
  get updateComplete() {
    return this.getUpdateComplete()
  }
  getUpdateComplete() {
    return this._$ES
  }
  shouldUpdate(e) {
    return !0
  }
  update(e) {
    this._$Ej && (this._$Ej = this._$Ej.forEach((r) => this._$EC(r, this[r]))), this._$EU()
  }
  updated(e) {}
  firstUpdated(e) {}
}
;(me.elementStyles = []),
  (me.shadowRootOptions = { mode: 'open' }),
  (me[je('elementProperties')] = /* @__PURE__ */ new Map()),
  (me[je('finalized')] = /* @__PURE__ */ new Map()),
  Ur == null || Ur({ ReactiveElement: me }),
  (Gt.reactiveElementVersions ?? (Gt.reactiveElementVersions = [])).push('2.0.4')
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ze = globalThis,
  yr = ze.trustedTypes,
  Fo = yr ? yr.createPolicy('lit-html', { createHTML: (t) => t }) : void 0,
  li = '$lit$',
  Wt = `lit$${Math.random().toFixed(9).slice(2)}$`,
  ci = '?' + Wt,
  fs = `<${ci}>`,
  ae = document,
  Ve = () => ae.createComment(''),
  qe = (t) => t === null || (typeof t != 'object' && typeof t != 'function'),
  di = Array.isArray,
  ws = (t) => di(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == 'function',
  Nr = `[ 	
\f\r]`,
  De = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  Vo = /-->/g,
  qo = />/g,
  oe = RegExp(
    `>|${Nr}(?:([^\\s"'>=/]+)(${Nr}*=${Nr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,
    'g'
  ),
  Ho = /'/g,
  Uo = /"/g,
  pi = /^(?:script|style|textarea|title)$/i,
  hi =
    (t) =>
    (e, ...r) => ({ _$litType$: t, strings: e, values: r }),
  l = hi(1),
  Q = hi(2),
  pt = Symbol.for('lit-noChange'),
  V = Symbol.for('lit-nothing'),
  No = /* @__PURE__ */ new WeakMap(),
  ie = ae.createTreeWalker(ae, 129)
function ui(t, e) {
  if (!Array.isArray(t) || !t.hasOwnProperty('raw')) throw Error('invalid template strings array')
  return Fo !== void 0 ? Fo.createHTML(e) : e
}
const bs = (t, e) => {
  const r = t.length - 1,
    i = []
  let o,
    s = e === 2 ? '<svg>' : '',
    a = De
  for (let d = 0; d < r; d++) {
    const c = t[d]
    let h,
      p,
      g = -1,
      y = 0
    for (; y < c.length && ((a.lastIndex = y), (p = a.exec(c)), p !== null); )
      (y = a.lastIndex),
        a === De
          ? p[1] === '!--'
            ? (a = Vo)
            : p[1] !== void 0
              ? (a = qo)
              : p[2] !== void 0
                ? (pi.test(p[2]) && (o = RegExp('</' + p[2], 'g')), (a = oe))
                : p[3] !== void 0 && (a = oe)
          : a === oe
            ? p[0] === '>'
              ? ((a = o ?? De), (g = -1))
              : p[1] === void 0
                ? (g = -2)
                : ((g = a.lastIndex - p[2].length),
                  (h = p[1]),
                  (a = p[3] === void 0 ? oe : p[3] === '"' ? Uo : Ho))
            : a === Uo || a === Ho
              ? (a = oe)
              : a === Vo || a === qo
                ? (a = De)
                : ((a = oe), (o = void 0))
    const _ = a === oe && t[d + 1].startsWith('/>') ? ' ' : ''
    s +=
      a === De
        ? c + fs
        : g >= 0
          ? (i.push(h), c.slice(0, g) + li + c.slice(g) + Wt + _)
          : c + Wt + (g === -2 ? d : _)
  }
  return [ui(t, s + (t[r] || '<?>') + (e === 2 ? '</svg>' : '')), i]
}
class He {
  constructor({ strings: e, _$litType$: r }, i) {
    let o
    this.parts = []
    let s = 0,
      a = 0
    const d = e.length - 1,
      c = this.parts,
      [h, p] = bs(e, r)
    if (((this.el = He.createElement(h, i)), (ie.currentNode = this.el.content), r === 2)) {
      const g = this.el.content.firstChild
      g.replaceWith(...g.childNodes)
    }
    for (; (o = ie.nextNode()) !== null && c.length < d; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes())
          for (const g of o.getAttributeNames())
            if (g.endsWith(li)) {
              const y = p[a++],
                _ = o.getAttribute(g).split(Wt),
                O = /([.?@])?(.*)/.exec(y)
              c.push({
                type: 1,
                index: s,
                name: O[2],
                strings: _,
                ctor: O[1] === '.' ? ms : O[1] === '?' ? ys : O[1] === '@' ? xs : Lr
              }),
                o.removeAttribute(g)
            } else g.startsWith(Wt) && (c.push({ type: 6, index: s }), o.removeAttribute(g))
        if (pi.test(o.tagName)) {
          const g = o.textContent.split(Wt),
            y = g.length - 1
          if (y > 0) {
            o.textContent = yr ? yr.emptyScript : ''
            for (let _ = 0; _ < y; _++)
              o.append(g[_], Ve()), ie.nextNode(), c.push({ type: 2, index: ++s })
            o.append(g[y], Ve())
          }
        }
      } else if (o.nodeType === 8)
        if (o.data === ci) c.push({ type: 2, index: s })
        else {
          let g = -1
          for (; (g = o.data.indexOf(Wt, g + 1)) !== -1; )
            c.push({ type: 7, index: s }), (g += Wt.length - 1)
        }
      s++
    }
  }
  static createElement(e, r) {
    const i = ae.createElement('template')
    return (i.innerHTML = e), i
  }
}
function ye(t, e, r = t, i) {
  var a, d
  if (e === pt) return e
  let o = i !== void 0 ? ((a = r._$Co) == null ? void 0 : a[i]) : r._$Cl
  const s = qe(e) ? void 0 : e._$litDirective$
  return (
    (o == null ? void 0 : o.constructor) !== s &&
      ((d = o == null ? void 0 : o._$AO) == null || d.call(o, !1),
      s === void 0 ? (o = void 0) : ((o = new s(t)), o._$AT(t, r, i)),
      i !== void 0 ? ((r._$Co ?? (r._$Co = []))[i] = o) : (r._$Cl = o)),
    o !== void 0 && (e = ye(t, o._$AS(t, e.values), o, i)),
    e
  )
}
class _s {
  constructor(e, r) {
    ;(this._$AV = []), (this._$AN = void 0), (this._$AD = e), (this._$AM = r)
  }
  get parentNode() {
    return this._$AM.parentNode
  }
  get _$AU() {
    return this._$AM._$AU
  }
  u(e) {
    const {
        el: { content: r },
        parts: i
      } = this._$AD,
      o = ((e == null ? void 0 : e.creationScope) ?? ae).importNode(r, !0)
    ie.currentNode = o
    let s = ie.nextNode(),
      a = 0,
      d = 0,
      c = i[0]
    for (; c !== void 0; ) {
      if (a === c.index) {
        let h
        c.type === 2
          ? (h = new er(s, s.nextSibling, this, e))
          : c.type === 1
            ? (h = new c.ctor(s, c.name, c.strings, this, e))
            : c.type === 6 && (h = new Cs(s, this, e)),
          this._$AV.push(h),
          (c = i[++d])
      }
      a !== (c == null ? void 0 : c.index) && ((s = ie.nextNode()), a++)
    }
    return (ie.currentNode = ae), o
  }
  p(e) {
    let r = 0
    for (const i of this._$AV)
      i !== void 0 &&
        (i.strings !== void 0 ? (i._$AI(e, i, r), (r += i.strings.length - 2)) : i._$AI(e[r])),
        r++
  }
}
class er {
  get _$AU() {
    var e
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv
  }
  constructor(e, r, i, o) {
    ;(this.type = 2),
      (this._$AH = V),
      (this._$AN = void 0),
      (this._$AA = e),
      (this._$AB = r),
      (this._$AM = i),
      (this.options = o),
      (this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0)
  }
  get parentNode() {
    let e = this._$AA.parentNode
    const r = this._$AM
    return r !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = r.parentNode), e
  }
  get startNode() {
    return this._$AA
  }
  get endNode() {
    return this._$AB
  }
  _$AI(e, r = this) {
    ;(e = ye(this, e, r)),
      qe(e)
        ? e === V || e == null || e === ''
          ? (this._$AH !== V && this._$AR(), (this._$AH = V))
          : e !== this._$AH && e !== pt && this._(e)
        : e._$litType$ !== void 0
          ? this.$(e)
          : e.nodeType !== void 0
            ? this.T(e)
            : ws(e)
              ? this.k(e)
              : this._(e)
  }
  S(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB)
  }
  T(e) {
    this._$AH !== e && (this._$AR(), (this._$AH = this.S(e)))
  }
  _(e) {
    this._$AH !== V && qe(this._$AH)
      ? (this._$AA.nextSibling.data = e)
      : this.T(ae.createTextNode(e)),
      (this._$AH = e)
  }
  $(e) {
    var s
    const { values: r, _$litType$: i } = e,
      o =
        typeof i == 'number'
          ? this._$AC(e)
          : (i.el === void 0 && (i.el = He.createElement(ui(i.h, i.h[0]), this.options)), i)
    if (((s = this._$AH) == null ? void 0 : s._$AD) === o) this._$AH.p(r)
    else {
      const a = new _s(o, this),
        d = a.u(this.options)
      a.p(r), this.T(d), (this._$AH = a)
    }
  }
  _$AC(e) {
    let r = No.get(e.strings)
    return r === void 0 && No.set(e.strings, (r = new He(e))), r
  }
  k(e) {
    di(this._$AH) || ((this._$AH = []), this._$AR())
    const r = this._$AH
    let i,
      o = 0
    for (const s of e)
      o === r.length
        ? r.push((i = new er(this.S(Ve()), this.S(Ve()), this, this.options)))
        : (i = r[o]),
        i._$AI(s),
        o++
    o < r.length && (this._$AR(i && i._$AB.nextSibling, o), (r.length = o))
  }
  _$AR(e = this._$AA.nextSibling, r) {
    var i
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, r); e && e !== this._$AB; ) {
      const o = e.nextSibling
      e.remove(), (e = o)
    }
  }
  setConnected(e) {
    var r
    this._$AM === void 0 && ((this._$Cv = e), (r = this._$AP) == null || r.call(this, e))
  }
}
class Lr {
  get tagName() {
    return this.element.tagName
  }
  get _$AU() {
    return this._$AM._$AU
  }
  constructor(e, r, i, o, s) {
    ;(this.type = 1),
      (this._$AH = V),
      (this._$AN = void 0),
      (this.element = e),
      (this.name = r),
      (this._$AM = o),
      (this.options = s),
      i.length > 2 || i[0] !== '' || i[1] !== ''
        ? ((this._$AH = Array(i.length - 1).fill(new String())), (this.strings = i))
        : (this._$AH = V)
  }
  _$AI(e, r = this, i, o) {
    const s = this.strings
    let a = !1
    if (s === void 0)
      (e = ye(this, e, r, 0)), (a = !qe(e) || (e !== this._$AH && e !== pt)), a && (this._$AH = e)
    else {
      const d = e
      let c, h
      for (e = s[0], c = 0; c < s.length - 1; c++)
        (h = ye(this, d[i + c], r, c)),
          h === pt && (h = this._$AH[c]),
          a || (a = !qe(h) || h !== this._$AH[c]),
          h === V ? (e = V) : e !== V && (e += (h ?? '') + s[c + 1]),
          (this._$AH[c] = h)
    }
    a && !o && this.j(e)
  }
  j(e) {
    e === V
      ? this.element.removeAttribute(this.name)
      : this.element.setAttribute(this.name, e ?? '')
  }
}
class ms extends Lr {
  constructor() {
    super(...arguments), (this.type = 3)
  }
  j(e) {
    this.element[this.name] = e === V ? void 0 : e
  }
}
class ys extends Lr {
  constructor() {
    super(...arguments), (this.type = 4)
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== V)
  }
}
class xs extends Lr {
  constructor(e, r, i, o, s) {
    super(e, r, i, o, s), (this.type = 5)
  }
  _$AI(e, r = this) {
    if ((e = ye(this, e, r, 0) ?? V) === pt) return
    const i = this._$AH,
      o =
        (e === V && i !== V) ||
        e.capture !== i.capture ||
        e.once !== i.once ||
        e.passive !== i.passive,
      s = e !== V && (i === V || o)
    o && this.element.removeEventListener(this.name, this, i),
      s && this.element.addEventListener(this.name, this, e),
      (this._$AH = e)
  }
  handleEvent(e) {
    var r
    typeof this._$AH == 'function'
      ? this._$AH.call(((r = this.options) == null ? void 0 : r.host) ?? this.element, e)
      : this._$AH.handleEvent(e)
  }
}
class Cs {
  constructor(e, r, i) {
    ;(this.element = e), (this.type = 6), (this._$AN = void 0), (this._$AM = r), (this.options = i)
  }
  get _$AU() {
    return this._$AM._$AU
  }
  _$AI(e) {
    ye(this, e)
  }
}
const Wr = ze.litHtmlPolyfillSupport
Wr == null || Wr(He, er), (ze.litHtmlVersions ?? (ze.litHtmlVersions = [])).push('3.1.4')
const $s = (t, e, r) => {
  const i = (r == null ? void 0 : r.renderBefore) ?? e
  let o = i._$litPart$
  if (o === void 0) {
    const s = (r == null ? void 0 : r.renderBefore) ?? null
    i._$litPart$ = o = new er(e.insertBefore(Ve(), s), s, void 0, r ?? {})
  }
  return o._$AI(t), o
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class u extends me {
  constructor() {
    super(...arguments), (this.renderOptions = { host: this }), (this._$Do = void 0)
  }
  createRenderRoot() {
    var r
    const e = super.createRenderRoot()
    return (r = this.renderOptions).renderBefore ?? (r.renderBefore = e.firstChild), e
  }
  update(e) {
    const r = this.render()
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
      super.update(e),
      (this._$Do = $s(r, this.renderRoot, this.renderOptions))
  }
  connectedCallback() {
    var e
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0)
  }
  disconnectedCallback() {
    var e
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1)
  }
  render() {
    return pt
  }
}
var ai
;(u._$litElement$ = !0),
  (u.finalized = !0),
  (ai = globalThis.litElementHydrateSupport) == null || ai.call(globalThis, { LitElement: u })
const Gr = globalThis.litElementPolyfillSupport
Gr == null || Gr({ LitElement: u })
;(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push('4.0.6')
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const f = (t) => (e, r) => {
  r !== void 0
    ? r.addInitializer(() => {
        customElements.define(t, e)
      })
    : customElements.define(t, e)
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ks = { attribute: !0, type: String, converter: mr, reflect: !1, hasChanged: ao },
  Os = (t = ks, e, r) => {
    const { kind: i, metadata: o } = r
    let s = globalThis.litPropertyMetadata.get(o)
    if (
      (s === void 0 && globalThis.litPropertyMetadata.set(o, (s = /* @__PURE__ */ new Map())),
      s.set(r.name, t),
      i === 'accessor')
    ) {
      const { name: a } = r
      return {
        set(d) {
          const c = e.get.call(this)
          e.set.call(this, d), this.requestUpdate(a, c, t)
        },
        init(d) {
          return d !== void 0 && this.P(a, void 0, t), d
        }
      }
    }
    if (i === 'setter') {
      const { name: a } = r
      return function (d) {
        const c = this[a]
        e.call(this, d), this.requestUpdate(a, c, t)
      }
    }
    throw Error('Unsupported decorator location: ' + i)
  }
function n(t) {
  return (e, r) =>
    typeof r == 'object'
      ? Os(t, e, r)
      : ((i, o, s) => {
          const a = o.hasOwnProperty(s)
          return (
            o.constructor.createProperty(s, a ? { ...i, wrapped: !0 } : i),
            a ? Object.getOwnPropertyDescriptor(o, s) : void 0
          )
        })(t, e, r)
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Y(t) {
  return n({ ...t, state: !0, attribute: !1 })
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const vi = (t, e, r) => (
  (r.configurable = !0),
  (r.enumerable = !0),
  Reflect.decorate && typeof e != 'object' && Object.defineProperty(t, e, r),
  r
)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function S(t, e) {
  return (r, i, o) => {
    const s = (a) => {
      var d
      return ((d = a.renderRoot) == null ? void 0 : d.querySelector(t)) ?? null
    }
    return vi(r, i, {
      get() {
        return s(this)
      }
    })
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let Es
function gi(t) {
  return (e, r) =>
    vi(e, r, {
      get() {
        return (this.renderRoot ?? Es ?? (Es = document.createDocumentFragment())).querySelectorAll(
          t
        )
      }
    })
}
const Ss = w`
    :host {
      display: flex;
      padding: 12px 0;
      box-sizing: border-box;
      font: var(--awc-font-text-regular-14);
      color: var(--colors-light-secondary);
      position: relative;
      cursor: pointer;
      max-width: max-content;
      transition: background-color 0.3s, color 0.3s, border-color 0.3s;
    }

    .awc-tab {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
    }

    :host(:hover) {
      color: var(--colors-light-text);
    }

    :host::before,
    :host::after {
      content: "";
      position: absolute;
      display: block;
      opacity: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      background-color: rgba(55, 97, 233, 0.35);
      border-radius: var(--corner-radius-m);
      transform-origin: 50% 100%;
      transition: 0.3s ease, transform 0.3s ease;
      transform: scaleX(0);
    }

    :host(:hover)::before,
    :host(:hover)::after {
      transition: width 0.3s, transform 0.3s ease; 
      opacity: 1;
      transform-origin: 50% 100%;
      transform: scaleX(1);
    }

    :host([active]),
    :host([active]:hover) {
      color: var(--colors-light-text);
    }

    :host([active])::before,
    :host([active])::after {
      opacity: 1;
      transform: scaleX(1);
      width: 100%;
      transition: width 0.3s ease, background-color 0.3s ease;
      background-color: var(--colors-light-primary);
    }

    :host([disabled]) {
      pointer-events: none;
      opacity: 0.5;
    }

    :host([hidden]) {
      display: none;
    }
`
var Ps = Object.defineProperty,
  As = Object.getOwnPropertyDescriptor,
  fi = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? As(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && Ps(e, r, o), o
  }
const no = 'awc-tab'
let xr = class extends u {
  constructor() {
    super(...arguments), (this.active = !1)
  }
  _handleTabClick() {
    ;(this.active = !this.active), this._onChange()
  }
  _onChange() {
    this.dispatchEvent(new Event('change', { bubbles: !0, composed: !0 }))
  }
  render() {
    return l`
      <span class="awc-tab" ?active=${this.active} @click=${this._handleTabClick}><slot></slot></span>
    `
  }
}
xr.styles = [Ss]
fi([n({ type: Boolean, reflect: !0 })], xr.prototype, 'active', 2)
xr = fi([f(no)], xr)
const Ls = w`
  :host {
    display: block;
  }

  .awc-tabs-container {
    display: flex;
    position: relative;
    justify-content: start;
    align-items: center;
    gap: 24px;
  }
`
var Bs = Object.defineProperty,
  Is = Object.getOwnPropertyDescriptor,
  wi = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? Is(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && Bs(e, r, o), o
  }
const bi = 'awc-tabs-group'
let Cr = class extends u {
  constructor() {
    super(...arguments), (this.noDivider = !1)
  }
  get tabs() {
    return [...this.querySelectorAll(no)]
  }
  _handleTabClick(t) {
    const e = t.target
    this.tabs.forEach((r) => {
      r.active = !1
    }),
      (e.active = !0)
  }
  render() {
    return l`
      <div class="awc-tabs-container" >
        <slot @click=${this._handleTabClick}></slot>
      </div>
      ${this.noDivider ? '' : l`<awc-divider spacing="none"></awc-divider>`}
    `
  }
}
Cr.styles = [Ls]
wi([n({ type: Boolean, reflect: !0, attribute: 'no-divider' })], Cr.prototype, 'noDivider', 2)
Cr = wi([f(bi)], Cr)
let _i = !1
const mi = []
function yi(t) {
  _i ? t() : mi.push(t)
}
document.addEventListener('DOMContentLoaded', () => {
  ;(_i = !0), mi.forEach((t) => t())
})
const Ts = w`
  :host {
    width: 100%;
    display: inline-block;
    contain: content;
  }

  .awc-segment-switcher__item {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font: var(--awc-font-caption-1-medium);
    height: 32px;
    text-align: center;
    text-decoration: none;
    margin: 0;
    border-radius: var(--corner-radius-s);
    color: var(--colors-light-text);
    transition: background-color .3s ease;
  }

  .awc-segment-switcher__item:hover{
    background-color: rgba(0, 0, 0, 0.07);
  }

  .awc-segment-switcher__item:active{
    background-color: rgba(0, 0, 0, 0.1);
  }

  :host([active]) .awc-segment-switcher__item {
    transition: background-color 0.4s ease;
    color: var(--colors-light-titles);
    background-color: var(--colors-light-white);
    border-radius: var(--corner-radius-s);
  }
`
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const F = (t) => t ?? V
function Ds(t, e) {
  return function (r, i) {
    const o = new CustomEvent(e, {
      detail: r,
      bubbles: !0,
      cancelable: !1,
      composed: !0,
      ...i
    })
    return t.dispatchEvent(o), o
  }
}
function P(t) {
  return (e, r) => {
    Object.defineProperty(e, r, {
      get() {
        return Ds(this, t || r)
      },
      enumerable: !0,
      configurable: !0
    })
  }
}
var Ms = Object.defineProperty,
  js = Object.getOwnPropertyDescriptor,
  rr = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? js(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && Ms(e, r, o), o
  }
const zs = 'awc-segment-switcher-item'
let ne = class extends u {
  constructor() {
    super(...arguments), (this.active = !1), (this.target = '_self')
  }
  update(t) {
    super.update(t),
      t.has('active') &&
        this.active &&
        (this.dispatchEvent(new Event('change', { bubbles: !0, composed: !0 })),
        this._handleActiveItem())
  }
  _handleActiveItem() {
    this._onChangeActive(this.active)
  }
  render() {
    return this.href
      ? l`
      <a
        class="awc-segment-switcher__item"
        href="${F(this.href)}"
        target=${F(this.target)}
        @change="${this._handleActiveItem}"
      >
        <slot></slot>
      </a>
    `
      : l`
      <div
        class="awc-segment-switcher__item"
        @change="${this._handleActiveItem}"
      >
        <slot></slot>
      </div>
    `
  }
}
ne.styles = [Ts]
rr([n({ type: String, reflect: !0 })], ne.prototype, 'href', 2)
rr([n({ type: Boolean, reflect: !0 })], ne.prototype, 'active', 2)
rr([n({ reflect: !0 })], ne.prototype, 'target', 2)
rr([P('awc-segment-item-change')], ne.prototype, '_onChangeActive', 2)
ne = rr([f('awc-segment-switcher-item')], ne)
const Rs = w`
    :host{
        display: inline-block;
        width: 100%;
    }

    .awc-segment-switcher {
        position: relative;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(32px, 1fr));
        justify-content: space-between;
        align-items: center;
        border-radius: var(--corner-radius-s);
        background-color: var(--colors-light-stroke);
        overflow: hidden;
        padding: 2px;
    }

    .slider {
        position: absolute;
        height: 32px;
        background-color: var(--colors-light-white);
        border-radius: var(--corner-radius-s);
        transition: transform .3s ease;
    }
`
var Fs = Object.defineProperty,
  Vs = Object.getOwnPropertyDescriptor,
  Br = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? Vs(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && Fs(e, r, o), o
  }
let xe = class extends u {
  constructor() {
    super(...arguments), (this.sliderPosition = 0), (this.sliderWidth = 0)
  }
  get segmentSwitcherItems() {
    return [...this.querySelectorAll(zs)]
  }
  connectedCallback() {
    super.connectedCallback(),
      yi(() => {
        requestAnimationFrame(() => this.updateSliderPosition())
      })
    const t = new MutationObserver((e) => {
      e.forEach((r) => {
        r.type === 'attributes' && r.attributeName === 'active' && this.updateSliderPosition()
      })
    })
    this.segmentSwitcherItems.forEach((e) => {
      t.observe(e, { attributes: !0 })
    })
  }
  updated(t) {
    super.updated(t),
      (t.has('sliderPosition') || t.has('sliderWidth')) && this._toggleSliderVisibility()
  }
  handleSegmentItemClick(t) {
    const e = t.target
    e &&
      !e.active &&
      (this.segmentSwitcherItems.forEach((r) => (r.active = !1)),
      (e.active = !0),
      this._setSliderPositionToActiveItem(e))
  }
  _setSliderPositionToActiveItem(t) {
    this.segmentSwitcherItems.forEach((e) => (e.active = !1)),
      (t.active = !0),
      t.active && ((this.sliderPosition = t.offsetLeft), (this.sliderWidth = t.offsetWidth))
  }
  _toggleSliderVisibility() {
    this._slider &&
      (this._slider.addEventListener('transitionstart', () => {
        ;(this._slider.style.visibility = 'visible'), (this._slider.style.opacity = '1')
      }),
      this._slider.addEventListener('transitionend', () => {
        ;(this._slider.style.visibility = 'hidden'), (this._slider.style.opacity = '0')
      }))
  }
  updateSliderPosition() {
    const t = this.querySelector('awc-segment-switcher-item[active]')
    if (t) {
      const e = t.getBoundingClientRect(),
        r = this.getBoundingClientRect()
      ;(this.sliderPosition = e.left - r.left), (this.sliderWidth = t.offsetWidth)
    }
  }
  handleSegmentActive(t) {
    const e = t.target
    this.segmentSwitcherItems.forEach((r) => {
      r !== e && r.active && (r.active = !1)
    })
  }
  render() {
    return l`
      <div class='awc-segment-switcher'>
      <div class="slider" style="transform: translateX(${this.sliderPosition}px); width: ${this.sliderWidth}px;"></div>
        <slot 
        @click="${this.handleSegmentItemClick}"
        @awc-segment-item-change="${this.handleSegmentActive}"
        ></slot>
      </div>
    `
  }
}
xe.styles = [Rs]
Br([Y()], xe.prototype, 'sliderPosition', 2)
Br([Y()], xe.prototype, 'sliderWidth', 2)
Br([S('.slider')], xe.prototype, '_slider', 2)
xe = Br([f('awc-segment-switcher')], xe)
const qs = w`
    :host{
      display: block;
    }

    .awc-alert {
      padding: 12px 16px;
      text-align: start;
      word-wrap: break-word;
      overflow-wrap: break-word;
      font: var(--awc-font-text-regular-14);
    }

    .awc-alert.block{
      border-radius: var(--corner-radius-m);
    }

    .awc-alert.message{
      border-radius: 0 var(--corner-radius-m) var(--corner-radius-m) var(--corner-radius-m);
    }

    .awc-alert.primary {
      background: rgba(42, 140, 227, 0.1);
      color: var(--global-cyan-500);
    }

    .awc-alert.warning {
      background: rgba(255, 113, 136, 0.1);
      color: var(--colors-light-warning);
    }

    .awc-alert.success {
      background: rgba(36, 184, 135, 0.1);
      color: var(--global-green-500);
    }

    .awc-alert.attention {
      background: rgba(253, 144, 56, 0.1);
      color: var(--global-orange-400);
    }

    .awc-alert__title {
      margin: 0;
      padding: 0;
    }
`
var Hs = Object.defineProperty,
  Us = Object.getOwnPropertyDescriptor,
  lo = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? Us(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && Hs(e, r, o), o
  }
let Ue = class extends u {
  constructor() {
    super(...arguments), (this.color = 'primary'), (this.variant = 'block')
  }
  render() {
    return l`
      <div class="awc-alert ${this.color} ${this.variant}">
        <p class="awc-alert__title"><slot></slot></p>
      </div>
    `
  }
}
Ue.styles = [qs]
lo([n({ type: String, reflect: !0 })], Ue.prototype, 'color', 2)
lo([n({ type: String, reflect: !0 })], Ue.prototype, 'variant', 2)
Ue = lo([f('awc-alert')], Ue)
const Ns = w`
  :host {
    display: inline-flex;
  }

  .awc-avatar-container {
    text-decoration: none;
    position: relative;
    display: inline-block;
  }

  :host([sliced]) {
    margin-left: calc(-1 * var(--spacing-s)) !important;
  }

  :host([sliced]) .awc-avatar-container {
    border: 2px solid var(--colors-light-white);
    border-radius: 50%;
  }

  :host([hidden]) {
    display: none;
  }
  
  .awc-avatar {
    position: relative;
    display: flex;
    overflow: hidden;
  }

  .awc-avatar__status {
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
  }

  .awc-avatar-status__wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 99px;
    width: 100%;
    height: 100%;
    background-color: white; 
    box-sizing: border-box;
  }

  .awc-avatar__online {
    background-color: var(--global-light-green-500);
    width: 100%;
    height: 100%;
    border-radius: 99px;
  }

  .awc-avatar__offline {
    background-color: var(--colors-light-avatar-offline);
    width: 100%;
    height: 100%;
    border-radius: 99px;
  }

  .awc-avatar__none {
    display: none;
  }

  .awc-avatar--image{
    display: flex;
    width: 100%;
    height: 100%;
  }

  /* .awc-avatar-status__wrapper.awc-avatar__fail {
    background-color: red;
  } */

  .awc-avatar__current {
    display: block;
    position: relative;
    border-radius: var(--corner-radius-circular);
    border: 2px solid var(--colors-light-white);
    transition: background-color 0.3s ease-in-out;
  }

  /* Rounded */
  .awc-avatar.circle {
    border-radius: var(--corner-radius-circular);
  }

  .awc-avatar.square {
    border-radius: var(--corner-radius-l);
  }

  /* Size */
  .awc-avatar.size_24 {
    width: 24px;
    height: 24px;
  }

  .awc-avatar.size_24 + .awc-avatar__status .awc-avatar__current {
    width: 5px;
    height: 5px;
  }

  .awc-avatar.size_24 + .awc-avatar__status .awc-avatar__status--icon{
    width: 10px;
    height: 10px;
  }

  .awc-avatar.size_32 {
    width: 32px;
    height: 32px;
  }

  .awc-avatar.size_32 + .awc-avatar__status .awc-avatar__current {
    width: 7px;
    height: 7px;
  }

  .awc-avatar.size_36 {
    width: 36px;
    height: 36px;
  }

  .awc-avatar.size_36 + .awc-avatar__status .awc-avatar__current {
    width: 7px;
    height: 7px;
  }

  .awc-avatar.size_40 {
    width: 40px;
    height: 40px;
  }

  .awc-avatar.size_40 + .awc-avatar__status .awc-avatar__current {
    width: 8px;
    height: 8px;
  }

  .awc-avatar.size_32 + .awc-avatar__status .awc-avatar__status--icon,
  .awc-avatar.size_36 + .awc-avatar__status .awc-avatar__status--icon,
  .awc-avatar.size_40 + .awc-avatar__status .awc-avatar__status--icon {
    width: 14px;
    height: 14px;
  }

  .awc-avatar.size_48 {
    width: 48px;
    height: 48px;
  }

  .awc-avatar.size_48 + .awc-avatar__status .awc-avatar__current {
    width: 8px;
    height: 8px;
  }

  .awc-avatar.size_48 + .awc-avatar__status .awc-avatar__status--icon {
    width: 16px;
    height: 16px;
  }

  .awc-avatar.size_128 {
    width: 128px;
    height: 128px;
  }

  .awc-avatar.size_128 + .awc-avatar__status .awc-avatar__current {
    width: 24px;
    height: 24px;
    border: 6px solid var(--colors-light-white);
  }

  .awc-avatar.size_128 + .awc-avatar__status .awc-avatar__status--icon {
    width: 36px;
    height: 36px;
  }

  .awc-avatar.size_160 {
    width: 160px;
    height: 160px;
  }

  .awc-avatar.size_160 + .awc-avatar__status .awc-avatar__current {
    width: 40px;
    height: 40px;
    border: 6px solid var(--colors-light-white);
  }

  .awc-avatar.size_160 + .awc-avatar__status .awc-avatar__status--icon {
    width: 40px;
    height: 40px;
  }

  .awc-avatar span {
    background-color: var(--awc-avatar-custom-color);
    width: 100%;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .awc-avatar--no-image {
    cursor: not-allowed;
    pointer-events: none;
  }

  .awc-avatar--no-image svg{
    max-width: 85%;
    height: 100%;
  }

  .awc-avatar--no-image.group,
  .awc-avatar--no-image.user {
    background-color: #f2f3fa;
    fill: #91a2b6;
  }

  .awc-avatar--no-image.deleted {
    background-color: #919BB6;
    fill: var(--colors-light-white);
  }

  .awc-avatar--no-image.anonymous {
    background-color: var(--colors-light-titles);
    fill: var(--colors-light-white);
  }

  .awc-avatar--no-image.anonymous svg,
  .awc-avatar--no-image.deleted svg{
    max-width: 50%;
    max-height: 50%;
  }

  .awc-avatar--no-image.group svg,
  .awc-avatar--no-image.user svg{
    max-width: 67%;
    max-height: 67%;
  }

  .awc-avatar--no-image.robot {
    background-color: #8DADD0;
    fill: var(--colors-light-white);
  }

  .awc-avatar--no-image.undefinded {
    background-color: #919BB6A3;
    fill: var(--colors-light-white);
  }

  .awc-avatar--no-image.undefinded svg{
    width: 34%;
  }

  /* title size */
  .awc-avatar.size_24 .awc-avatar--no-image {
    font: var(--awc-font-text-medium-14);
  }

  .awc-avatar.size_32 .awc-avatar--no-image {
    font: var(--awc-font-h5-medium);
  }
  .awc-avatar.size_36 .awc-avatar--no-image {
    font: 500 20px/24px "Inter";
  }

  .awc-avatar.size_40 .awc-avatar--no-image {
    font: var(--awc-font-h4-medium);
  }

  .awc-avatar.size_48 .awc-avatar--no-image {
    font: var(--awc-font-h3-medium);
  }

  .awc-avatar.size_128 .awc-avatar--no-image {
    font: var(--awc-font-h2-medium);
  }

  .awc-avatar.size_160 .awc-avatar--no-image {
    font: var(--awc-font-h1-medium);
  }
`
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Nt = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 },
  co =
    (t) =>
    (...e) => ({ _$litDirective$: t, values: e })
class po {
  constructor(e) {}
  get _$AU() {
    return this._$AM._$AU
  }
  _$AT(e, r, i) {
    ;(this._$Ct = e), (this._$AM = r), (this._$Ci = i)
  }
  _$AS(e, r) {
    return this.update(e, r)
  }
  update(e, r) {
    return this.render(...r)
  }
}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const et = co(
  class extends po {
    constructor(t) {
      var e
      if (
        (super(t),
        t.type !== Nt.ATTRIBUTE ||
          t.name !== 'class' ||
          ((e = t.strings) == null ? void 0 : e.length) > 2)
      )
        throw Error(
          '`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.'
        )
    }
    render(t) {
      return (
        ' ' +
        Object.keys(t)
          .filter((e) => t[e])
          .join(' ') +
        ' '
      )
    }
    update(t, [e]) {
      var i, o
      if (this.st === void 0) {
        ;(this.st = /* @__PURE__ */ new Set()),
          t.strings !== void 0 &&
            (this.nt = new Set(
              t.strings
                .join(' ')
                .split(/\s/)
                .filter((s) => s !== '')
            ))
        for (const s in e) e[s] && !((i = this.nt) != null && i.has(s)) && this.st.add(s)
        return this.render(e)
      }
      const r = t.element.classList
      for (const s of this.st) s in e || (r.remove(s), this.st.delete(s))
      for (const s in e) {
        const a = !!e[s]
        a === this.st.has(s) ||
          ((o = this.nt) != null && o.has(s)) ||
          (a ? (r.add(s), this.st.add(s)) : (r.remove(s), this.st.delete(s)))
      }
      return pt
    }
  }
)
var Ws = Object.defineProperty,
  Gs = Object.getOwnPropertyDescriptor,
  nt = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? Gs(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && Ws(e, r, o), o
  },
  xi = /* @__PURE__ */ ((t) => (
    (t.GlobalRed2600 = 'global-red-2-600'),
    (t.GlobalRed2500 = 'global-red-2-500'),
    (t.GlobalOrange500 = 'global-orange-500'),
    (t.GlobalYellow500 = 'global-yellow-500'),
    (t.GlobalYellow300 = 'global-yellow-300'),
    (t.GlobalLightGreen400 = 'global-light-green-400'),
    (t.GlobalLightGreen600 = 'global-light-green-600'),
    (t.GlobalGreen600 = 'global-green-600'),
    (t.GlobalGreen300 = 'global-green-300'),
    (t.GlobalTurquoise300 = 'global-turquoise-300'),
    (t.GlobalTurquoise400 = 'global-turquoise-400'),
    (t.GlobalCyan300 = 'global-cyan-300'),
    (t.GlobalCyan500 = 'global-cyan-500'),
    (t.GlobalBlue600 = 'global-blue-600'),
    (t.GlobalBlue400 = 'global-blue-400'),
    (t.GlobalDeepPurple400 = 'global-deep-purple-400'),
    (t.GlobalDeepPurple600 = 'global-deep-purple-600'),
    (t.GlobalPurple600 = 'global-purple-600'),
    (t.GlobalPurple400 = 'global-purple-400'),
    (t.GlobalRed500 = 'global-red-500'),
    (t.GlobalRed400 = 'global-red-400'),
    (t.ColorsLightSecondary = 'colors-light-secondary'),
    (t.ColorsLightText = 'colors-light-text'),
    (t.ColorsLightDarkBlue = 'colors-light-dark-blue'),
    t
  ))(xi || {}),
  Ci = /* @__PURE__ */ ((t) => (
    (t.none = 'none'),
    (t.robot = 'robot'),
    (t.user = 'user'),
    (t.group = 'group'),
    (t.deleted = 'deleted'),
    (t.anonymous = 'anonymous'),
    (t.undefinded = 'undefinded'),
    t
  ))(Ci || {})
const Zs = {
    anonymous: Q`
  <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.71336 5.65322L2.57606 1.31676C2.85923 -0.10662 4.72235 -0.476455 5.52771 0.730849C5.79228 1.12745 6.37513 1.12745 6.63969 0.730849C7.44506 -0.476454 9.30818 -0.106622 9.59135 1.31676L10.4624 5.69495C10.6961 5.75171 10.9288 5.81295 11.1603 5.87864L11.6511 6.01788C11.9062 6.09023 12.0543 6.35563 11.9819 6.61066C11.9095 6.86569 11.6442 7.01378 11.3891 6.94143L10.8983 6.80219C9.73953 6.47345 8.5506 6.2622 7.34949 6.17164C6.45119 6.10391 5.54906 6.10391 4.65075 6.17164C3.44965 6.2622 2.26071 6.47345 1.10193 6.80219L0.611127 6.94143C0.356094 7.01378 0.0906973 6.86569 0.018346 6.61066C-0.0540052 6.35563 0.0940872 6.09023 0.34912 6.01788L0.83992 5.87864C1.12936 5.79653 1.42059 5.72137 1.71336 5.65322ZM7.43831 1.26359C7.76887 0.768059 8.53357 0.919854 8.6498 1.50407L9.44006 5.47641C8.77288 5.35296 8.09911 5.26544 7.42167 5.21436C6.47532 5.143 5.52493 5.143 4.57858 5.21436C3.95977 5.26102 3.34402 5.33808 2.73356 5.44516L3.51761 1.50407C3.63384 0.919854 4.39854 0.76806 4.7291 1.26359C5.37369 2.22987 6.79372 2.22987 7.43831 1.26359Z" fill="white"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.960123 9.83963C0.960123 8.6467 1.92719 7.67963 3.12012 7.67963C4.14809 7.67963 5.00833 8.39772 5.2266 9.35963H6.77365C6.99192 8.39772 7.85216 7.67963 8.88012 7.67963C10.0731 7.67963 11.0401 8.6467 11.0401 9.83963C11.0401 11.0326 10.0731 11.9996 8.88012 11.9996C7.85216 11.9996 6.99192 11.2815 6.77365 10.3196H5.2266C5.00833 11.2815 4.14809 11.9996 3.12012 11.9996C1.92719 11.9996 0.960123 11.0326 0.960123 9.83963ZM3.12012 8.63963C2.45738 8.63963 1.92012 9.17689 1.92012 9.83963C1.92012 10.5024 2.45738 11.0396 3.12012 11.0396C3.78286 11.0396 4.32012 10.5024 4.32012 9.83963C4.32012 9.17689 3.78286 8.63963 3.12012 8.63963ZM7.68012 9.83963C7.68012 9.17689 8.21738 8.63963 8.88012 8.63963C9.54286 8.63963 10.0801 9.17689 10.0801 9.83963C10.0801 10.5024 9.54286 11.0396 8.88012 11.0396C8.21738 11.0396 7.68012 10.5024 7.68012 9.83963Z" fill="white"/>
  </svg>`,
    deleted: Q`
  <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.00004 0.96C6.8616 0.96 7.56004 1.65844 7.56004 2.52C7.56004 3.38156 6.8616 4.08 6.00004 4.08C5.13847 4.08 4.44004 3.38156 4.44004 2.52C4.44004 1.65844 5.13847 0.96 6.00004 0.96ZM8.52004 2.52C8.52004 1.12824 7.3918 0 6.00004 0C4.60828 0 3.48004 1.12824 3.48004 2.52C3.48004 3.91176 4.60828 5.04 6.00004 5.04C7.3918 5.04 8.52004 3.91176 8.52004 2.52ZM8.04004 6.48C8.04004 6.2149 7.82514 6 7.56004 6H4.44004C2.51809 6 0.96004 7.55805 0.96004 9.48V10.02C0.96004 11.1135 1.84652 12 2.94004 12H5.52004C5.78514 12 6.00004 11.7851 6.00004 11.52C6.00004 11.2549 5.78514 11.04 5.52004 11.04H2.94004C2.37671 11.04 1.92004 10.5833 1.92004 10.02V9.48C1.92004 8.08824 3.04828 6.96 4.44004 6.96H7.56004C7.82514 6.96 8.04004 6.7451 8.04004 6.48ZM10.899 8.85936C11.0865 8.67188 11.0864 8.36796 10.8989 8.18054C10.7114 7.99311 10.4075 7.99316 10.2201 8.18064L9.05939 9.34172L7.89934 8.18243C7.71183 7.99504 7.40791 7.99514 7.22052 8.18265C7.03313 8.37016 7.03323 8.67408 7.22074 8.86147L8.38067 10.0207L7.22104 11.1806C7.03362 11.3681 7.03367 11.672 7.22115 11.8595C7.40863 12.0469 7.71255 12.0468 7.89997 11.8594L9.05971 10.6993L10.2207 11.8595C10.4083 12.0469 10.7122 12.0468 10.8996 11.8593C11.087 11.6718 11.0869 11.3679 10.8993 11.1805L9.73843 10.0203L10.899 8.85936Z" fill="white"/>
  </svg>
  `,
    robot: Q`
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M5 8C5 6.34315 6.34315 5 8 5H16C17.6569 5 19 6.34315 19 8V16C19 17.6569 17.6569 19 16 19H8C6.34315 19 5 17.6569 5 16V8ZM8 7C7.44772 7 7 7.44772 7 8V16C7 16.5523 7.44772 17 8 17H16C16.5523 17 17 16.5523 17 16V8C17 7.44772 16.5523 7 16 7H8Z" fill="white"/>
      <path d="M7 15C5.34315 15 4 13.6569 4 12C4 10.3431 5.34315 9 7 9C7 11 7 13 7 15Z" fill="white"/>
      <path d="M17 15C18.6569 15 20 13.6569 20 12C20 10.3431 18.6569 9 17 9C17 11 17 13 17 15Z" fill="white"/>
      <path d="M15 7C15 5.34315 13.6569 4 12 4C10.3431 4 9 5.34315 9 7C11 7 13 7 15 7Z" fill="white"/>
      <rect x="9" y="13" width="6" height="2" rx="1" fill="white"/>
      <circle cx="10" cy="10" r="1" fill="white"/>
      <circle cx="14" cy="10" r="1" fill="white"/>
  </svg>
  `,
    user: Q`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z"/></svg>`,
    group: Q`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M110.5-205v-86q0-25 11.75-45.25T155.5-369q53-31 112-47.75T390-433.5q63.5 0 122.25 16.75T624-369q21.5 12.5 33.25 32.75T669-291v86H110.5Zm629 0v-85q0-41.5-19.25-75.75T669-421.5q36.5 8 70.75 20.75t65.75 32.25Q826-357 837.75-336t11.75 46v85h-110ZM390-479q-58 0-98-40t-40-98q0-58 40-98t98-40q58 0 98 40t40 98q0 58-40 98t-98 40Zm318-138.5q0 57.5-40 97.75t-98 40.25q-6.5 0-12.25-.25T545-482q24.5-27.5 38.75-61.5t14.25-74q0-39.5-14.25-73.75T545-753q6.5-1.5 12.5-1.75T570-755q58 0 98 40t40 97.5Z"/></svg>`,
    undefinded: Q`<svg viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.25799 2.02428C3.28688 1.85771 2.2515 2.45517 1.94312 3.33182C1.75985 3.85281 1.18893 4.12658 0.667941 3.94331C0.146952 3.76004 -0.126822 3.18912 0.0564498 2.66813C0.706862 0.819198 2.7195 -0.268818 4.59611 0.0530702C6.39616 0.361827 8.01237 2.04641 8.00978 4.00091C8.00934 5.53127 6.87472 6.5419 6.06448 7.08206C5.62885 7.37248 5.20034 7.58602 4.88467 7.72632L4.32601 7.94869C3.80207 8.12334 3.23575 7.84018 3.0611 7.31623C2.88657 6.79264 3.16924 6.22672 3.69251 6.05167C3.82132 6.00646 3.94769 5.95412 4.0724 5.89869C4.31923 5.78899 4.64072 5.62753 4.95508 5.41795C5.64468 4.95822 6.00978 4.46914 6.00978 4.00001L6.00979 3.99852C6.0111 3.11391 5.19369 2.18478 4.25799 2.02428ZM2.99978 11C2.99978 10.4477 3.4475 10 3.99978 10H4.00978C4.56207 10 5.00978 10.4477 5.00978 11C5.00978 11.5523 4.56207 12 4.00978 12H3.99978C3.4475 12 2.99978 11.5523 2.99978 11Z" fill="white"/>
  </svg>
  `
  },
  $i = 'awc-avatar'
let tt = class extends u {
  constructor() {
    super(...arguments),
      (this.size = '36'),
      (this.rounded = 'circle'),
      (this.status = 'none'),
      (this.color = 'global-blue-400'),
      (this.target = '_self'),
      (this.icon = 'none'),
      (this.sliced = !1),
      (this.hidden = !1)
  }
  _trimAvatarCharacter(t) {
    if (this.title)
      return this.title.length > 1
        ? ((this._croppedTitle = t.split('').shift()), this._croppedTitle)
        : t
  }
  _setColorOrImage() {
    const t = this._trimAvatarCharacter(this.title)
    if (this.imageLink)
      return l`<img
        class="awc-avatar--image"
        src="${this.imageLink}"
      />`
    if (this.icon && Object.values(Ci).includes(this.icon) && this.icon !== 'none')
      return l`<span
        class="awc-avatar--no-image ${this.icon}"
        >${Zs[this.icon]}</span
      >`
    if (this.color && !this.customColor)
      return l`<span
        style="background-color: var(--${this.color})"
        class="awc-avatar--no-image"
        >${t}</span
      >`
    if ((this.color && this.customColor) || (this.customColor && !this.color))
      return l`<span
        style="--awc-avatar-custom-color: ${this.customColor}"
        class="awc-avatar--no-image"
        >${t}</span
      >`
  }
  render() {
    const t = {
        'awc-avatar-container': !0
      },
      e = Q`
    <svg class="awc-avatar__status--icon" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="12" height="12" rx="6" fill="#35D3AC" stroke="white" stroke-width="2"/>
      <path d="M5 7L6.5 8.5L9 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
      r = Q`
    <svg class="awc-avatar__status--icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="14" height="14" rx="7" fill="#FF7188" stroke="white" stroke-width="2"/>
      <path d="M5.5 5.5L8 8M10.5 10.5L8 8M8 8L5.5 10.5M8 8L10.5 5.5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
    `
    return this.href
      ? l`
    <a href=${this.href} target=${this.target} class=${et(t)}>
        <div class="awc-avatar size_${this.size} ${this.rounded}">
          ${this._setColorOrImage()}
        </div>

        ${
          this.status !== 'none'
            ? l`
              <div class="awc-avatar__status">
                ${
                  this.status === 'online' || this.status === 'offline'
                    ? l` <div class="awc-avatar-status__wrapper">
                      <div class="awc-avatar__current">
                        <div class="awc-avatar__${this.status}"></div>
                      </div>
                    </div>`
                    : ''
                }
                ${this.status === 'complete' ? l`${e}` : ''}
                ${this.status === 'fail' ? l`${r}` : ''}
              </div>
            `
            : l``
        }
      </a>
    `
      : l`
    <div class=${et(t)}>
        <div class="awc-avatar size_${this.size} ${this.rounded}">
          ${this._setColorOrImage()}
        </div>

        ${
          this.status !== 'none'
            ? l`
              <div class="awc-avatar__status">
                ${
                  this.status === 'online' || this.status === 'offline'
                    ? l` <div class="awc-avatar-status__wrapper">
                      <div class="awc-avatar__current">
                        <div class="awc-avatar__${this.status}"></div>
                      </div>
                    </div>`
                    : ''
                }
                ${this.status === 'complete' ? l`${e}` : ''}
                ${this.status === 'fail' ? l`${r}` : ''}
              </div>
            `
            : l``
        }
      </div>
    `
  }
}
tt.styles = [Ns]
nt([n({ type: String, reflect: !0 })], tt.prototype, 'size', 2)
nt([n({ type: String, reflect: !0 })], tt.prototype, 'rounded', 2)
nt([n({ type: String, reflect: !0 })], tt.prototype, 'status', 2)
nt([n({ type: String, reflect: !0 })], tt.prototype, 'color', 2)
nt([n({ type: String, reflect: !0 })], tt.prototype, 'title', 2)
nt([n({ type: String, attribute: 'image-link' })], tt.prototype, 'imageLink', 2)
nt([n({ type: String, reflect: !0 })], tt.prototype, 'href', 2)
nt([n({ type: String })], tt.prototype, 'target', 2)
nt([n({ type: String, reflect: !0, attribute: 'custom-color' })], tt.prototype, 'customColor', 2)
nt([n({ type: String, reflect: !0 })], tt.prototype, 'icon', 2)
nt([n({ type: Boolean, reflect: !0 })], tt.prototype, 'sliced', 2)
nt([n({ type: Boolean, reflect: !0 })], tt.prototype, 'hidden', 2)
nt([Y()], tt.prototype, '_croppedTitle', 2)
tt = nt([f($i)], tt)
const Xs = w`
    :host {
      display: inline-flex;
    }

    .awc-avatar-group {
      display: inline-flex;;
      align-items: center;
    }
   
    .awc-avatar-group__counter {
      display: block;
      position: relative;
      z-index: 1;
      margin-left: -10px;
      display: flex;
      min-width: 24px;
      height: 24px;
      font: var(--awc-font-caption-2-regular);
      align-items: center;
      justify-content: center;
      background-color: var(--colors-light-secondary);
    }

    ::slotted([slot="awc-avatar-group-counter"] ) { 
      margin-left: -10px !important;
    }

    .awc-avatar-group__counter p {
      color: var(--colors-light-white);
    }

    .awc-avatar-group__counter.circle {
      border-radius: var(--corner-radius-circular);
      border: 2px solid var(--colors-light-white);
    }

    .awc-avatar-group__counter.size_24 {
      width: 24px;
      height: 24px;
    }

    .awc-avatar-group__counter.size_24 p {
      font: var(--awc-font-caption-2-regular);
    }

    .awc-avatar-group__counter.size_32 {
      width: 32px;
      height: 32px;
    }

    .awc-avatar-group__counter.size_32 p {
      font: var(--awc-font-caption-1-regular);
    }

    .awc-avatar-group__counter.hidden{
      display: none;
    }
`,
  Ks = w`
  :host {
    display: inline-flex;
  }

  .awc-avatar-group__counter {
    position: relative;
    z-index: 1;
    display: flex;
    min-width: 24px;
    height: 24px;
    font: var(--awc-font-caption-2-regular);
    align-items: center;
    justify-content: center;
    background-color: var(--colors-light-secondary);
  }

  .awc-avatar-group__counter p {
    margin: 0;
    color: var(--colors-light-white);
  }

  .awc-avatar-group__counter.circle {
    border-radius: var(--corner-radius-circular);
    border: 2px solid var(--colors-light-white);
  }

  .awc-avatar-group__counter.size_24 {
    width: 24px;
    height: 24px;
  }

  .awc-avatar-group__counter.size_24 p {
    font: var(--awc-font-caption-2-regular);
  }

  .awc-avatar-group__counter.size_32 {
    width: 32px;
    height: 32px;
  }

  .awc-avatar-group__counter.size_32 p {
    font: var(--awc-font-caption-1-regular);
  }
`
var Ys = Object.defineProperty,
  Js = Object.getOwnPropertyDescriptor,
  Ir = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? Js(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && Ys(e, r, o), o
  }
const ki = 'awc-avatar-group-counter'
let Ce = class extends u {
  constructor() {
    super(...arguments),
      (this.totalUsers = 0),
      (this.counterSize = '24'),
      (this.counterRounded = 'circle')
  }
  render() {
    return l`
            <div class="awc-avatar-group__counter size_${this.counterSize} ${this.counterRounded}">
                <p>+${this.totalUsers}</p>
            </div>
        `
  }
}
Ce.styles = [Ks]
Ir([n({ type: Number, attribute: 'total-users' })], Ce.prototype, 'totalUsers', 2)
Ir([n({ type: String, attribute: 'counter-size' })], Ce.prototype, 'counterSize', 2)
Ir([n({ attribute: 'counter-rounded' })], Ce.prototype, 'counterRounded', 2)
Ce = Ir([f(ki)], Ce)
var Qs = Object.defineProperty,
  ta = Object.getOwnPropertyDescriptor,
  fe = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? ta(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && Qs(e, r, o), o
  }
const ea = 'awc-avatar-group'
let Mt = class extends u {
  constructor() {
    super(...arguments),
      (this.displayUsers = 2),
      (this.totalUsers = 0),
      (this.counterSize = '24'),
      (this.counterRounded = 'circle'),
      (this._counterValue = 0),
      (this._counterHidden = !1)
  }
  get avatars() {
    return Array.from(this.querySelectorAll($i))
  }
  get avatarCounter() {
    return this.querySelector(ki)
  }
  _updateDisplayedUsers() {
    var e, r
    const t =
      (r = (e = this.shadowRoot) == null ? void 0 : e.querySelector('slot')) == null
        ? void 0
        : r.assignedElements()
    t &&
      t.forEach((i, o) => {
        i.hidden = o >= this.displayUsers
      })
  }
  _updateCounterValue() {
    this.avatarCounter
      ? (this._counterHidden = this._counterValue === 0)
      : ((this._counterValue = Math.max(0, this.totalUsers - this.displayUsers)),
        (this._counterHidden = this._counterValue === 0))
  }
  _applySliceEffect() {
    var e, r
    const t =
      (r = (e = this.shadowRoot) == null ? void 0 : e.querySelector('slot')) == null
        ? void 0
        : r.assignedElements()
    t &&
      t.forEach((i, o) => {
        i.sliced = o !== 0
      })
  }
  connectedCallback() {
    super.connectedCallback(),
      document.addEventListener('DOMContentLoaded', () => {
        this._applySliceEffect(), this._updateDisplayedUsers(), this._updateCounterValue()
      })
  }
  updated(t) {
    ;(t.has('displayUsers') || t.has('totalUsers')) &&
      (this._updateDisplayedUsers(), this._updateCounterValue()),
      this._applySliceEffect()
  }
  render() {
    return l`
      <div class="awc-avatar-group">
        <slot></slot>
        ${
          this._counterHidden
            ? ''
            : l`
          <div class="awc-avatar-group__counter size_${this.counterSize} ${this.counterRounded}">
            <p>+${this._counterValue}</p>
          </div>`
        }
            <slot name="awc-avatar-group-counter"></slot>
      </div>
    `
  }
}
Mt.styles = [Xs]
fe([n({ type: Number, attribute: 'display-users' })], Mt.prototype, 'displayUsers', 2)
fe([n({ type: Number, attribute: 'total-users' })], Mt.prototype, 'totalUsers', 2)
fe([n({ type: String, attribute: 'counter-size' })], Mt.prototype, 'counterSize', 2)
fe([n({ type: String, attribute: 'counter-rounded' })], Mt.prototype, 'counterRounded', 2)
fe([Y()], Mt.prototype, '_counterValue', 2)
fe([Y()], Mt.prototype, '_counterHidden', 2)
Mt = fe([f(ea)], Mt)
const ra = w`
    :host {
      display: inline-block;
      contain: content;
    }

    :host .awc-badge {
      content: "";
      display: block;
      width: 6px;
      height: 6px;
      border-radius: var(--corner-radius-circular);
    }

    .awc-badge.warning {
      background-color: var(--colors-light-warning);
    }

    .awc-badge.primary {
      background-color: var(--colors-light-primary);
    }
`
var oa = Object.defineProperty,
  ia = Object.getOwnPropertyDescriptor,
  Oi = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? ia(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && oa(e, r, o), o
  }
let $r = class extends u {
  constructor() {
    super(...arguments), (this.color = 'primary')
  }
  render() {
    return l` <span class="awc-badge ${this.color}"></span> `
  }
}
$r.styles = [ra]
Oi([n({ type: String, reflect: !0 })], $r.prototype, 'color', 2)
$r = Oi([f('awc-badge')], $r)
const sa = w`
    :host {
      display: block;
      contain: content;
      max-width: max-content;
    }

    .awc-counter {
      content: "";
      font: var(--awc-font-caption-3-regular);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--colors-light-white);
      background-color: var(--colors-light-primary);
      padding: 0 4px;
      min-width: 8px;
      height: 16px;
      border-radius: var(--corner-radius-circular);
    }

    .awc-counter.more::after {
      content: "+";
      display: block;
    }

    .awc-counter.none {
      display: none;
    }
`
var aa = Object.defineProperty,
  na = Object.getOwnPropertyDescriptor,
  Ei = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? na(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && aa(e, r, o), o
  }
let kr = class extends u {
  constructor() {
    super(...arguments), (this.value = 1)
  }
  _checkMaxValue() {
    return !Number.isInteger(this.value) || this.value <= 0
      ? ''
      : this.value > 99
        ? '99+'
        : this.value.toString()
  }
  update(t) {
    super.update(t), this._checkMaxValue()
  }
  render() {
    const t = this._checkMaxValue()
    return l`
      <span class="awc-counter" value=${this.value}>${t}</span>
    `
  }
}
kr.styles = [sa]
Ei([n({ type: Number, reflect: !0 })], kr.prototype, 'value', 2)
kr = Ei([f('awc-counter')], kr)
const la = w`
    :host {
      display: inline-flex;
    }

    .awc-toolbar-button {
        position: relative;
        cursor: pointer;
        border: 1px solid transparent;
        max-width: max-content;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 6px;
        background-color: transparent;
        border-radius: var(--corner-radius-s);
        transition: border .3s ease-in-out, background-color .3s ease;
        max-width: 36px;
        max-height: 36px;
    }

    .awc-toolbar-button:hover{
        transition: background-color .3s ease;
        background-color: rgba(5, 35, 125, 0.05);
    }

    .awc-toolbar-button:active{
        transition: background-color .3s ease;
        background-color: rgba(5, 35, 125, 0.08);
    }

    .awc-toolbar-button:focus{
        outline: none;
    }

    .awc-toolbar-button:focus-visible{
        outline: none;
        border: 1px solid var(--colors-light-focus);
        transition: background-color .3s ease;
        background-color: rgba(5, 35, 125, 0.05);
    }

    /* .awc-toolbar-button:focus-visible::before{
        content: "";
        position: absolute;
        inset: -3px;
        border: 3px solid #839ff633;
        pointer-events: none;
        border-radius: var(--corner-radius-m);
    } */
`
var ca = Object.defineProperty,
  da = Object.getOwnPropertyDescriptor,
  pa = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? da(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && ca(e, r, o), o
  }
let Zr = class extends u {
  render() {
    return l`
      <button
        type="button"
        tabindex="0" 
        class="awc-toolbar-button">
        <slot></slot>
      </button>
    `
  }
}
Zr.styles = [la]
Zr = pa([f('awc-toolbar-button')], Zr)
const ha = w`
    :host {
      display: inline-block;
    }

    .awc-toolbar-group{
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 8px;
    }
`
var ua = Object.defineProperty,
  va = Object.getOwnPropertyDescriptor,
  ga = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? va(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && ua(e, r, o), o
  }
let Xr = class extends u {
  render() {
    return l`
      <div class='awc-toolbar-group'>
            <slot></slot>
      </div>
    `
  }
}
Xr.styles = [ha]
Xr = ga([f('awc-toolbar-group')], Xr)
const fa = w`
    :host {
      display: inline-flex;
    }

    .awc-dropdown {
      display: flex;
      flex-direction: column;
      position: relative;
      max-width: max-content;
    }
`,
  wa = w`
    .awc-dropdown-list.bottom-left {
      left: 0;
    }

    .awc-dropdown-list.bottom-right {
      right: 0;
    }

    .awc-dropdown-list.top-left {
      bottom: 50px;
    }

    .awc-dropdown-list.top-right {
      bottom: 50px;
      right: 0;
    }

    .awc-dropdown-list {
      visibility: hidden;
      transform: translateY(0px);
      position: absolute;
      margin: 0;
      opacity: 0;
      border-radius: var(--corner-radius-s);
      transition: .3s ease-in;
      display: flex;
      flex-direction: column;
      max-width: max-content;
      padding: 6px 0;
      background-color: var(--colors-light-white);
      list-style: none;
      box-shadow: 4px 4px 8px 0px rgba(64, 72, 98, 0.1);
      z-index: 999999;
    }

    :host([visible]) .awc-dropdown-list {
      visibility: visible;
      transform: translateY(10px);
      opacity: 1;
      transition: .3s ease;
    }
`,
  ba = w`
  :host {
    font: var(--awc-font-text-medium-15);
    word-wrap: break-word;
    color: var(--colors-light-text);
    cursor: pointer;
    list-style-type: none;
  }

  .awc-dropdown-item {
    display: grid;
    grid-template-columns: auto 1fr 0fr;
    align-items: center;
    padding: 7px 16px;
    gap: 10px;
    text-decoration: none;
    color: inherit;
    transition: background-color 0.3s ease-in-out;
    transition-duration: background-color 0.3s ease-in-out;
  }

  :host(:hover) .awc-dropdown-item {
    cursor: pointer;
    background-color: var(--colors-light-input-background);
  }

  .select-icon {
    content: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M13.7071 4.29289C14.0976 4.68342 14.0976 5.31658 13.7071 5.70711L7.70711 11.7071C7.31658 12.0976 6.68342 12.0976 6.29289 11.7071L3.29289 8.70711C2.90237 8.31658 2.90237 7.68342 3.29289 7.29289C3.68342 6.90237 4.31658 6.90237 4.70711 7.29289L7 9.58579L12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289Z' fill='%233761E9'/%3E%3C/svg%3E%0A");
    transition: 0.3 ease;
  }
  .select-icon--none {
    content: "";
    opacity: 0;
    transition: 0.3s ease;
    display: block;
    width: 16px;
    height: 16px;
  }
`
var _a = Object.defineProperty,
  ma = Object.getOwnPropertyDescriptor,
  Tr = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? ma(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && _a(e, r, o), o
  }
const Si = 'awc-dropdown-item'
let $e = class extends u {
  constructor() {
    super(...arguments), (this.target = '_self'), (this.selected = !1)
  }
  render() {
    return this.href
      ? l`<a
        class="awc-dropdown-item"
        href=${F(this.href)}
        target=${F(this.target)}
        ?select=${this.selected}
      >
        <slot></slot>
        ${this.selected ? l`<div class="select-icon"></div>` : l`<div class="select-icon--none"></div>`}
      </a>`
      : l`
        <div
          class="awc-dropdown-item"
          ?select=${this.selected}
        >
          <slot></slot>
          ${this.selected ? l`<div class="select-icon"></div>` : l`<div class="select-icon--none"></div>`}
        </div>
      `
  }
}
$e.styles = [ba]
Tr([n({ type: String })], $e.prototype, 'href', 2)
Tr([n({ type: String })], $e.prototype, 'target', 2)
Tr([n({ type: Boolean, reflect: !0 })], $e.prototype, 'selected', 2)
$e = Tr([f(Si)], $e)
var ya = Object.defineProperty,
  xa = Object.getOwnPropertyDescriptor,
  or = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? xa(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && ya(e, r, o), o
  }
const Pi = 'awc-dropdown-list'
let le = class extends u {
  constructor() {
    super(...arguments),
      (this.position = 'bottom-left'),
      (this.width = 250),
      (this.selectedMode = !1),
      (this.visible = !1)
  }
  get options() {
    return [...this.querySelectorAll(Si)]
  }
  _selectedModeHandle(t) {
    const e = t.target
    e && this.selectedMode && (e.selected = !e.selected)
  }
  _setMinWidth() {
    var e
    const t = (e = this.shadowRoot) == null ? void 0 : e.querySelector('ul')
    t && (t.style.minWidth = `${this.width}px`)
  }
  updated(t) {
    super.updated(t), t.has('width') && this._setMinWidth()
  }
  render() {
    const t = {
      'awc-dropdown-list': !0,
      [this.position]: !0
    }
    return l`
      <ul class="${et(t)}" ?visible=${this.visible} ?selected-mode=${this.selectedMode}>
        <slot @click=${this._selectedModeHandle}></slot>
      </ul>
    `
  }
}
le.styles = [wa]
or([n({ type: String, reflect: !0 })], le.prototype, 'position', 2)
or([n({ type: Number, reflect: !0 })], le.prototype, 'width', 2)
or([n({ type: Boolean, reflect: !0, attribute: 'selected-mode' })], le.prototype, 'selectedMode', 2)
or([n({ type: Boolean, reflect: !0 })], le.prototype, 'visible', 2)
le = or([f(Pi)], le)
var Ca = Object.defineProperty,
  $a = Object.getOwnPropertyDescriptor,
  Ai = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? $a(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && Ca(e, r, o), o
  }
let Or = class extends u {
  constructor() {
    super(...arguments),
      (this.notClosing = !1),
      (this._handleOutsideClick = (t) => {
        this.contains(t.target) || (this.options.visible = !1)
      })
  }
  get options() {
    return this.querySelector(Pi)
  }
  _handleDropdown(t) {
    const e = t.target
    e.tagName !== 'AWC-DROPDOWN-ITEM' &&
      ((this.options.visible = !this.options.visible),
      e.tagName === 'AWC-DROPDOWN-GROUP' && (this.options.visible = !0))
  }
  updated(t) {
    super.updated(t),
      t.has('notClosing') &&
        (this.notClosing
          ? document.removeEventListener('click', this._handleOutsideClick)
          : document.addEventListener('click', this._handleOutsideClick))
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener('click', this._handleOutsideClick)
  }
  render() {
    return l`
      <div class="awc-dropdown">
        <slot @click="${this._handleDropdown}"></slot>
      </div>
    `
  }
}
Or.styles = [fa]
Ai([n({ type: Boolean, reflect: !0, attribute: 'not-closing' })], Or.prototype, 'notClosing', 2)
Or = Ai([f('awc-dropdown')], Or)
const ka = w`
    /* :host {
        display: inline-flex;
    } */

    :host([divider]) .awc-dropdown-group {
        border-bottom: 1px solid var(--colors-light-stroke);
    }
        
    :host([label]) .awc-dropdown-group__label {
        padding: 4px 16px;
        pointer-events: none;
        color: var(--colors-light-secondary);
        font: var(--awc-font-caption-1-regular);
    }
    
`
var Oa = Object.defineProperty,
  Ea = Object.getOwnPropertyDescriptor,
  ho = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? Ea(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && Oa(e, r, o), o
  }
const Sa = 'awc-dropdown-group'
let Ne = class extends u {
  constructor() {
    super(...arguments), (this.divider = !1)
  }
  render() {
    return l`
            <div class="awc-dropdown-group">
                <label class="awc-dropdown-group__label">${this.label}</label>
                <div class="awc-dropdown-group__content">
                    <slot></slot>
                </div>
            </div>
        `
  }
}
Ne.styles = [ka]
ho([n({ type: String, reflect: !0 })], Ne.prototype, 'label', 2)
ho([n({ type: Boolean, reflect: !0 })], Ne.prototype, 'divider', 2)
Ne = ho([f(Sa)], Ne)
var B = function (t, e, r, i) {
    if (r === 'a' && !i) throw new TypeError('Private accessor was defined without a getter')
    if (typeof e == 'function' ? t !== e || !i : !e.has(t))
      throw new TypeError(
        'Cannot read private member from an object whose class did not declare it'
      )
    return r === 'm' ? i : r === 'a' ? i.call(t) : i ? i.value : e.get(t)
  },
  N = function (t, e, r, i, o) {
    if (i === 'm') throw new TypeError('Private method is not writable')
    if (i === 'a' && !o) throw new TypeError('Private accessor was defined without a setter')
    if (typeof e == 'function' ? t !== e || !o : !e.has(t))
      throw new TypeError('Cannot write private member to an object whose class did not declare it')
    return i === 'a' ? o.call(t, r) : o ? (o.value = r) : e.set(t, r), r
  }
function kt(t) {
  var e, r, i, o, s, a, d, c, h, p, g, y, _, O, C, $, L, M
  class z extends t {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    constructor(...v) {
      var b, m, k
      super(...v),
        e.add(this),
        (this.internals = this.attachInternals()),
        r.set(this, !1),
        i.set(this, !1),
        o.set(this, !1),
        s.set(this, void 0),
        a.set(this, void 0),
        d.set(this, !0),
        c.set(this, ''),
        h.set(this, () => {
          N(this, o, !0, 'f'), N(this, r, !0, 'f'), B(this, e, 'm', C).call(this)
        }),
        p.set(this, () => {
          N(this, r, !1, 'f'),
            B(this, e, 'm', $).call(this, this.shouldFormValueUpdate() ? B(this, c, 'f') : ''),
            !this.validity.valid && B(this, o, 'f') && N(this, i, !0, 'f')
          const T = B(this, e, 'm', C).call(this)
          this.validationMessageCallback &&
            this.validationMessageCallback(T ? this.internals.validationMessage : '')
        }),
        g.set(this, () => {
          var T
          B(this, d, 'f') &&
            this.validationTarget &&
            (this.internals.setValidity(
              this.validity,
              this.validationMessage,
              this.validationTarget
            ),
            N(this, d, !1, 'f')),
            N(this, o, !0, 'f'),
            N(this, i, !0, 'f'),
            B(this, e, 'm', C).call(this),
            (T = this === null || this === void 0 ? void 0 : this.validationMessageCallback) ===
              null ||
              T === void 0 ||
              T.call(this, this.showError ? this.internals.validationMessage : '')
        }),
        y.set(this, void 0),
        _.set(this, !1),
        O.set(this, Promise.resolve()),
        (b = this.addEventListener) === null ||
          b === void 0 ||
          b.call(this, 'focus', B(this, h, 'f')),
        (m = this.addEventListener) === null ||
          m === void 0 ||
          m.call(this, 'blur', B(this, p, 'f')),
        (k = this.addEventListener) === null ||
          k === void 0 ||
          k.call(this, 'invalid', B(this, g, 'f')),
        this.setValue(null)
    }
    /** Wires up control instances to be form associated */
    static get formAssociated() {
      return !0
    }
    static get validators() {
      return this.formControlValidators || []
    }
    /**
     * Allows the FormControl instance to respond to Validator attributes.
     * For instance, if a given Validator has a `required` attribute, that
     * validator will be evaluated whenever the host's required attribute
     * is updated.
     */
    static get observedAttributes() {
      const v = this.validators.map((k) => k.attribute).flat(),
        b = super.observedAttributes || []
      return [.../* @__PURE__ */ new Set([...b, ...v])]
    }
    /**
     * Return the validator associated with a given attribute. If no
     * Validator is associated with the attribute, it will return null.
     */
    static getValidator(v) {
      return this.validators.find((b) => b.attribute === v) || null
    }
    /**
     * Get all validators that are set to react to a given attribute
     * @param {string} attribute - The attribute that has changed
     * @returns {Validator[]}
     */
    static getValidators(v) {
      return this.validators.filter((b) => {
        var m
        if (b.attribute === v || (!((m = b.attribute) === null || m === void 0) && m.includes(v)))
          return !0
      })
    }
    /** Return a reference to the control's form */
    get form() {
      return this.internals.form
    }
    /**
     * Will return true if it is recommended that the control shows an internal
     * error. If using this property, it is wise to listen for 'invalid' events
     * on the element host and call preventDefault on the event. Doing this will
     * prevent browsers from showing a validation popup.
     */
    get showError() {
      return B(this, e, 'm', C).call(this)
    }
    /**
     * Forward the internals checkValidity method
     * will return the valid state of the control.
     */
    checkValidity() {
      return this.internals.checkValidity()
    }
    /** The element's validity state */
    get validity() {
      return this.internals.validity
    }
    /**
     * The validation message shown by a given Validator object. If the control
     * is in a valid state this should be falsy.
     */
    get validationMessage() {
      return this.internals.validationMessage
    }
    attributeChangedCallback(v, b, m) {
      var k
      ;(k = super.attributeChangedCallback) === null || k === void 0 || k.call(this, v, b, m)
      const j = this.constructor.getValidators(v)
      j != null && j.length && this.validationTarget && this.setValue(B(this, c, 'f'))
    }
    /** PUBLIC LIFECYCLE METHODS */
    /**
     * Sets the control's form value if the call to `shouldFormValueUpdate`
     * returns `true`.
     * @param value {FormValue} - The value to pass to the form
     */
    setValue(v) {
      var b
      N(this, i, !1, 'f'),
        (b = this.validationMessageCallback) === null || b === void 0 || b.call(this, ''),
        N(this, c, v, 'f')
      const k = this.shouldFormValueUpdate() ? v : null
      this.internals.setFormValue(k),
        B(this, e, 'm', $).call(this, k),
        this.valueChangedCallback && this.valueChangedCallback(k),
        B(this, e, 'm', C).call(this)
    }
    /**
     * This method can be overridden to determine if the control's form value
     * should be set on a call to `setValue`. An example of when a user might want
     * to skip this step is when implementing checkbox-like behavior, first checking
     * to see if `this.checked` is set to a truthy value. By default this returns
     * `true`.
     */
    shouldFormValueUpdate() {
      return !0
    }
    /** A promise that will resolve when all pending validations are complete */
    get validationComplete() {
      return new Promise((v) => v(B(this, O, 'f')))
    }
    /** Reset control state when the form is reset */
    formResetCallback() {
      var v, b
      N(this, o, !1, 'f'),
        N(this, i, !1, 'f'),
        B(this, e, 'm', C).call(this),
        (v = this.resetFormControl) === null || v === void 0 || v.call(this),
        (b = this.validationMessageCallback) === null ||
          b === void 0 ||
          b.call(this, B(this, e, 'm', C).call(this) ? this.validationMessage : '')
    }
  }
  return (
    (r = /* @__PURE__ */ new WeakMap()),
    (i = /* @__PURE__ */ new WeakMap()),
    (o = /* @__PURE__ */ new WeakMap()),
    (s = /* @__PURE__ */ new WeakMap()),
    (a = /* @__PURE__ */ new WeakMap()),
    (d = /* @__PURE__ */ new WeakMap()),
    (c = /* @__PURE__ */ new WeakMap()),
    (h = /* @__PURE__ */ new WeakMap()),
    (p = /* @__PURE__ */ new WeakMap()),
    (g = /* @__PURE__ */ new WeakMap()),
    (y = /* @__PURE__ */ new WeakMap()),
    (_ = /* @__PURE__ */ new WeakMap()),
    (O = /* @__PURE__ */ new WeakMap()),
    (e = /* @__PURE__ */ new WeakSet()),
    (C = function () {
      if (this.hasAttribute('disabled')) return !1
      const v = B(this, i, 'f') || (B(this, o, 'f') && !this.validity.valid && !B(this, r, 'f'))
      return (
        v && this.internals.states
          ? this.internals.states.add('--show-error')
          : this.internals.states && this.internals.states.delete('--show-error'),
        v
      )
    }),
    ($ = function (v) {
      const b = this.constructor,
        m = {},
        k = b.validators,
        T = [],
        j = k.some((H) => H.isValid instanceof Promise)
      B(this, _, 'f') ||
        (N(
          this,
          O,
          new Promise((H) => {
            N(this, y, H, 'f')
          }),
          'f'
        ),
        N(this, _, !0, 'f')),
        B(this, s, 'f') && (B(this, s, 'f').abort(), N(this, a, B(this, s, 'f'), 'f'))
      const R = new AbortController()
      N(this, s, R, 'f')
      let Z,
        G = !1
      k.length &&
        (k.forEach((H) => {
          const xt = H.key || 'customError',
            U = H.isValid(this, v, R.signal)
          U instanceof Promise
            ? (T.push(U),
              U.then((Ht) => {
                Ht != null &&
                  ((m[xt] = !Ht),
                  (Z = B(this, e, 'm', M).call(this, H, v)),
                  B(this, e, 'm', L).call(this, m, Z))
              }))
            : ((m[xt] = !U),
              this.validity[xt] !== !U && (G = !0),
              !U && !Z && (Z = B(this, e, 'm', M).call(this, H, v)))
        }),
        Promise.allSettled(T).then(() => {
          var H
          ;(R != null && R.signal.aborted) ||
            (N(this, _, !1, 'f'), (H = B(this, y, 'f')) === null || H === void 0 || H.call(this))
        }),
        (G || !j) && B(this, e, 'm', L).call(this, m, Z))
    }),
    (L = function (v, b) {
      if (this.validationTarget)
        this.internals.setValidity(v, b, this.validationTarget), N(this, d, !1, 'f')
      else {
        if ((this.internals.setValidity(v, b), this.internals.validity.valid)) return
        N(this, d, !0, 'f')
      }
    }),
    (M = function (v, b) {
      if (this.validityCallback) {
        const m = this.validityCallback(v.key || 'customError')
        if (m) return m
      }
      return v.message instanceof Function ? v.message(this, b) : v.message
    }),
    z
  )
}
const Dr = {
    attribute: 'required',
    key: 'valueMissing',
    message: 'Please fill out this field',
    isValid(t, e) {
      let r = !0
      return (t.hasAttribute('required') || t.required) && !e && (r = !1), r
    }
  },
  Pa = w`
  :host {
    display: inline-flex;
    position: relative;
    --awc-radio-background: var(--colors-light-white);
    --awc-radio-hover: var(--colors-light-light-background);
  }

  .awc-radio__wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .awc-radio__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .awc-radio:focus-visible {
    outline: 0px solid transparent;
  }

  .awc-radio:focus-visible > .awc-radio__label::before {
    outline: 1px solid var(--colors-light-focus);
  }

  .awc-radio__label {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 0;
    cursor: pointer;
    color: var(--colors-light-text);
    font: var(--awc-font-text-regular-14);
  }

  .awc-radio__label::before {
    content: "";
    display: inline-block;
    box-sizing: border-box;
    min-width: 20px;
    min-height: 20px;
    max-width: 20px;
    max-height: 20px;
    background-color: var(--awc-radio-background);
    border-radius: var(--corner-radius-circular);
    border: 1px solid var(--colors-light-checkbox);
    transition:
      border-color 0.25s ease,
      background-color 0.25s ease;
    animation: borderDecreaseAnimation 0.25s ease forwards;
    border: 1px solid var(--colors-light-checkbox);
  }

  @keyframes borderDecreaseAnimation {
    from {
      border-width: 6px;
    }
    to {
      border-width: 1px;
    }
  }

  .awc-radio__label:focus-visible {
    outline: 1px solid var(--colors-light-focus);
  }

  .checked .awc-radio__label::before {
    animation: borderIncreaseAnimation 0.25s ease forwards;
    border: 6px solid var(--colors-light-primary);
  }

  :host(:not([disabled])) .awc-radio__wrapper:hover .awc-radio__label::before  {
    background-color: var(--awc-radio-hover);
  }

  :host([checked]:not([disabled])) .awc-radio__wrapper:hover .awc-radio__label::before  {
    border-color: var(--colors-light-primary-hover);
  }

  :host([disabled]) .awc-radio { 
    cursor: not-allowed;
    pointer-events: none;
    opacity: 0.5;
  }

  @keyframes borderIncreaseAnimation {
    from {
      border-width: 1px;
    }
    to {
      border-width: 6px;
    }
  }

  .awc-radio__label.radio--error::before {
    border-color: var(--colors-light-warning);
  }

  :host([static-error]) .awc-radio__label.radio--error,
  .awc-radio__label.radio--error {
    color: var(--colors-light-warning);
  }

  .awc-radio__error {
    margin-top: var(--spacing-s);
    font: var(--awc-font-caption-1-regular);
    color: var(--colors-light-warning);
  }

  /* :host .radio:focus-visible::before{
      content: '';
      position: absolute;
      border: 3px solid #839FF633; 
      inset: -3px;
      border-radius: var(--corner-radius-circular);
      pointer-events: none;
    }

    :host([checked]) .radio:focus-visible {
      border: 1px solid var(--colors-light-primary);;
    }  */
`,
  Aa = w`
  .awc-radio-group {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-s);
  }

  .awc-radio-group__label {
    color: var(--colors-light-titles);
    font: var(--awc-font-text-medium-14);
  }

  .awc-radio-group__options {
    display: flex;
    gap: 16px;
    flex-direction: column;
  }

  .awc-radio-group__hint {
      margin-top: var(--spacing-s);
      font: var(--awc-font-caption-1-regular);
      color: var(--colors-light-secondary);
  }
`
var La = Object.defineProperty,
  Ba = Object.getOwnPropertyDescriptor,
  Le = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? Ba(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && La(e, r, o), o
  }
const Kr = 'awc-radio-change'
let Zt = class extends kt(u) {
  constructor() {
    super(...arguments),
      (this.value = ''),
      (this.name = ''),
      (this.label = ''),
      (this.hint = ''),
      (this.focusedOptionIndex = 0)
  }
  get options() {
    return [...this.querySelectorAll(Li)]
  }
  get availableOptions() {
    return this.options.filter((t) => !t.disabled)
  }
  _handleRadioButton(t) {
    const e = t.target
    this.setValue(e.value), this._onChange(e.value)
  }
  resetFormControl() {
    return this.options.forEach((t) => {
      ;(this.value = ''), (t.checked = !1)
    })
  }
  _handleKeyDown(t) {
    if (['ArrowDown', 'ArrowRight'].includes(t.key)) this.focusedOptionIndex++
    else if (['ArrowUp', 'ArrowLeft'].includes(t.key)) this.focusedOptionIndex--
    else if ([' '].includes(t.key)) {
      this.availableOptions[this.focusedOptionIndex].select()
      return
    } else return
    ;(this.focusedOptionIndex = Math.max(
      0,
      Math.min(this.focusedOptionIndex, this.availableOptions.length - 1)
    )),
      this.availableOptions[this.focusedOptionIndex].focus(),
      t.preventDefault()
  }
  _handleFocus() {
    this.availableOptions[this.focusedOptionIndex].focus()
  }
  updated(t) {
    super.updated(t), t.has('value') && this.setValue(this.value)
  }
  _setupAwcRadioValues() {
    this.options.forEach((t) => {
      t.checked && (console.log(t), (this.value = t.value))
    })
  }
  connectedCallback() {
    super.connectedCallback(),
      (this.tabIndex = 0),
      this.addEventListener('focus', this._handleFocus),
      this.addEventListener('keydown', this._handleKeyDown),
      this._setupAwcRadioValues(),
      document.addEventListener('DOMContentLoaded', () => {
        this._setupAwcRadioValues()
      })
  }
  render() {
    return l`
      <div class="awc-radio-group" role="radiogroup" aria-labelledby="label">
        <legend class="awc-radio-group__label">${this.label}</legend>
        <div
          class="awc-radio-group__options"
          @awc-checked=${this._handleRadioButton}
        >
          <slot></slot>
        </div>
        ${this.hint ? l`<span class="awc-radio-group__hint">${this.hint}</span>` : ''}
      </div>
    `
  }
}
Zt.styles = [Aa]
Le([n({ type: String })], Zt.prototype, 'value', 2)
Le([n({ type: String, reflect: !0 })], Zt.prototype, 'name', 2)
Le([n({ type: String, reflect: !0 })], Zt.prototype, 'label', 2)
Le([n({ type: String, reflect: !0 })], Zt.prototype, 'hint', 2)
Le([P(Kr)], Zt.prototype, '_onChange', 2)
Zt = Le([f('awc-radio-group')], Zt)
var Ia = Object.defineProperty,
  Ta = Object.getOwnPropertyDescriptor,
  rt = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? Ta(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && Ia(e, r, o), o
  }
const Li = 'awc-radio'
let W = class extends kt(u) {
  constructor() {
    super(...arguments),
      (this.staticError = !1),
      (this.disabled = !1),
      (this.checked = !1),
      (this.required = !1),
      (this.validationMessage = ''),
      (this._handleFieldValueChange = (t) => {
        const e = t.detail
        this.checked = e === this.value
      }),
      (this._onChange = () => {
        this.dispatchEvent(new Event('change', { bubbles: !0, composed: !0 }))
      }),
      (this._onInvalid = (t) => {
        t.preventDefault(), this.validationTarget.focus()
      })
  }
  validityCallback() {
    const t = document.createElement('input')
    return (t.type = 'radio'), (t.name = 'name'), (t.required = this.required), t.validationMessage
  }
  validationMessageCallback(t) {
    this.customError && !this.staticError
      ? ((this.validationMessage = t), (this.validationMessage = this.customError))
      : (this.validationMessage = t)
  }
  shouldFormValueUpdate() {
    return this.checked
  }
  connectedCallback() {
    super.connectedCallback(),
      this.addEventListener('invalid', this._onInvalid),
      this._setupFieldListener()
  }
  disconnectedCallback() {
    super.disconnectedCallback(),
      this.removeEventListener('invalid', this._onInvalid),
      this._cleanupFieldListener()
  }
  _setupFieldListener() {
    var t
    ;(this.field = this.closest('awc-radio-group')),
      this.field ||
        console.warn('awc-radio is designed to be used inside an awc-radio-group', this),
      (t = this.field) == null || t.addEventListener(Kr, this._handleFieldValueChange)
  }
  _cleanupFieldListener() {
    var t
    ;(t = this.field) == null || t.removeEventListener(Kr, this._handleFieldValueChange)
  }
  select() {
    ;(this.checked = !0), this._onChecked(this.value), this._onChange()
  }
  focus() {
    ;(this._radioElement.tabIndex = 0), this._radioElement.focus(), this._onFocus(this.value)
  }
  blur() {
    ;(this._radioElement.tabIndex = -1), this._onBlur(this.value)
  }
  updated(t) {
    super.updated(t), (t.has('checked') || t.has('value')) && this.setValue(this.value)
  }
  render() {
    const t = et({
        'awc-radio': !0,
        checked: this.checked
      }),
      e = {
        'awc-radio__label': !0,
        'radio--error': (this.showError && !this.checked) || (this.staticError && this.required)
      }
    return l`
      <div class="awc-radio__wrapper">
          <div class="awc-radio__container">
            <span
              class="${t}"
              role="radio"
              aria-checked=${this.checked}
              aria-required=${this.required}
              aria-disabled=${this.disabled}
              aria-labelledby="label"
              @blur=${this.blur}
              @click=${this.select}
            >
            <p id="label" class="${et(e)}">${this.label}</p>
            </span>
          </div>

        ${this.showError && this.required && !this.staticError ? l`<span class="awc-radio__error">${this.validationMessage}</span>` : ''}

        ${this.staticError && this.required && this.customError ? l`<span class="awc-radio__error">${this.customError}</span>` : ''}
      </div>
    `
  }
}
W.shadowRootOptions = { ...u.shadowRootOptions, delegatesFocus: !0 }
W.formControlValidators = [Dr]
W.styles = [Pa]
rt([n({ type: String, reflect: !0 })], W.prototype, 'name', 2)
rt([n({ type: String, reflect: !0 })], W.prototype, 'value', 2)
rt([n({ type: String, reflect: !0 })], W.prototype, 'label', 2)
rt([n({ reflect: !0, attribute: 'custom-error' })], W.prototype, 'customError', 2)
rt([n({ type: Boolean, reflect: !0, attribute: 'static-error' })], W.prototype, 'staticError', 2)
rt([n({ type: Boolean, reflect: !0 })], W.prototype, 'disabled', 2)
rt([n({ type: Boolean, reflect: !0 })], W.prototype, 'checked', 2)
rt([n({ type: Boolean, reflect: !0 })], W.prototype, 'required', 2)
rt([P('awc-checked')], W.prototype, '_onChecked', 2)
rt([P('awc-focus')], W.prototype, '_onFocus', 2)
rt([P('awc-blur')], W.prototype, '_onBlur', 2)
rt([S('[role=radio]')], W.prototype, '_radioElement', 2)
rt([S('[role=radio]')], W.prototype, 'validationTarget', 2)
rt([Y()], W.prototype, 'validationMessage', 2)
W = rt([f(Li)], W)
const Da = (globalThis.SubmitEvent = typeof globalThis.SubmitEvent < 'u' ? SubmitEvent : Event),
  Yr = (t) => {
    if (!(!t.noValidate && !t.reportValidity())) {
      const e = new Da('submit', {
        bubbles: !0,
        cancelable: !0
      })
      t.dispatchEvent(e), e.defaultPrevented || t.submit()
    }
  },
  Ma = w`
  :host {
    display: var(--awc-button-display, inline-flex);
    max-width: 100%;
  }

  .awc-button {
    position: relative;
    text-decoration: none;
    padding: 0;
    border: none;
    position: relative;
    width: 100%;
    gap: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    border-radius: var(--corner-radius-s);
    cursor: pointer;
    color: var(--colors-light-white);
    transition: background-color 0.3s ease, color 0.3s, border-color 0.3s ease, transform 0.3s ease;
    font: var(--awc-font-caption-1-regular);
    background-color: var(--button-background);
  }

  .awc-button:focus {
    outline: none;
  }

  awc-spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    transform: translate(-50%, -50%);
  }

  :host ::slotted(awc-spinner) {
    pointer-events: none;
    touch-action: none;
  }

  .awc-button:focus-visible {
    outline: 2px solid var(--colors-light-focus);
  }

  /* .awc-button:focus-visible:before {
    content: "";
    position: absolute;
    border: 3px solid #839ff633;
    inset: -3px;
    border-radius: var(--corner-radius-m);
    pointer-events: none;
  } */

  :host([disabled]) {
    user-select: none;
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
  
  :host([loading]) {
    pointer-events: none;
    touch-action: none;
    user-select: none;
  }

  .awc-button--disable{
    pointer-events: none;
    touch-action: none;
    user-select: none;
  }

  :host([loading]) .awc-button {
    color: transparent !important;
  }

  /* isBlock */
  :host([block]) .awc-button {
    width: 100%;
  }

  /* Color Primary */
  :host([background="blue"]) .awc-button {
    --button-background: var(--colors-light-primary);
  }

  :host([filling]) .awc-button ::slotted(awc-icon) {
    transition: fill 0.3s ease;
    fill: var(--colors-light-white);
  }

  :host([background="blue"]:not([disabled])) .awc-button:hover {
    --button-background: var(--colors-light-primary-hover);
  }

  :host([background="red"]) .awc-button {
    --button-background: var(--colors-light-warning);
  }

  :host([background="red"]:not([disabled])) .awc-button:hover {
    --button-background: var(--global-red-500);
  }

  :host([background="green"]) .awc-button {
    --button-background: var(--colors-light-success);
  }

  :host([background="green"]:not([disabled])) .awc-button:hover {
    --button-background: var(--global-green-400);
  }

  :host([background="gray"]) .awc-button {
    --button-background: var(--colors-light-secondary);
  }

  :host([background="gray"]:not([disabled])) .awc-button:hover {
    --button-background: var(--colors-light-secondary-hover);
  }

  /* Color Secondary */
  :host([background="blue"][variant="secondary"]) .awc-button {
    --button-background: rgba(55, 97, 233, 0.1);
    color: var(--colors-light-primary);
  }

  :host([background="blue"][variant="secondary"][filling])
    .awc-button
    ::slotted(awc-icon) {
    fill: var(--colors-light-primary);
  }

  :host([background="blue"][variant="secondary"]:not([disabled]))
    .awc-button:hover {
    --button-background: var(--colors-light-primary-hover);
    color: var(--colors-light-white);
  }

  :host([background="blue"][variant="secondary"][filling])
    .awc-button:hover
    ::slotted(awc-icon) {
    fill: var(--colors-light-white);
  }

  :host([background="red"][variant="secondary"]) .awc-button {
    --button-background: rgba(255, 0, 0, 0.1);
    color: var(--colors-light-warning);
  }

  :host([background="red"][variant="secondary"][filling])
    .awc-button
    ::slotted(awc-icon) {
    fill: var(--colors-light-warning);
  }

  :host([background="red"][variant="secondary"]:not([disabled]))
    .awc-button:hover {
    --button-background: var(--global-red-500);
    color: var(--colors-light-white);
  }

  :host([background="red"][variant="secondary"][filling])
    .awc-button:hover
    ::slotted(awc-icon) {
    fill: var(--colors-light-white);
  }

  :host([background="green"][variant="secondary"]) .awc-button {
    --button-background: rgba(53, 211, 172, 0.1);
    color: var(--colors-light-success);
  }

  :host([background="green"][variant="secondary"][filling])
    .awc-button
    ::slotted(awc-icon) {
    fill: var(--colors-light-success);
  }

  :host([background="green"][variant="secondary"]:not([disabled]))
    .awc-button:hover {
    --button-background: var(--global-green-400);
    color: var(--colors-light-white);
  }

  :host([background="green"][variant="secondary"][filling])
    .awc-button:hover
    ::slotted(awc-icon) {
    fill: var(--colors-light-white);
  }

  :host([background="gray"][variant="secondary"]) .awc-button {
    --button-background: rgba(145, 155, 182, 0.1);
    color: var(--colors-light-white);
  }

  :host([background="gray"][variant="secondary"][filling])
    .awc-button
    ::slotted(awc-icon) {
    fill: var(--colors-light-white);
  }

  :host([background="gray"][variant="secondary"]:not([disabled]))
    .awc-button:hover {
    --button-background: var(--colors-light-secondary-hover);
    color: var(--colors-light-white);
  }

  :host([background="gray"][variant="secondary"][filling])
    .awc-button:hover
    ::slotted(awc-icon) {
    fill: var(--colors-light-white);
  }

  /* Color transparent */
  :host([background="blue"][variant="transparent"]) .awc-button {
    --button-background: transparent;
    border: 1px solid #3761e959;
    color: var(--colors-light-primary);
  }

  :host([background="blue"][variant="transparent"][filling])
    .awc-button
    ::slotted(awc-icon) {
    fill: var(--colors-light-primary);
  }

  :host([background="blue"][variant="transparent"]:not([disabled]))
    .awc-button:hover {
    --button-background: var(--colors-light-primary-hover);
    color: var(--colors-light-white);
  }

  :host([background="blue"][variant="transparent"][filling])
    .awc-button:hover
    ::slotted(awc-icon) {
    fill: var(--colors-light-white);
  }

  :host([background="red"][variant="transparent"]) .awc-button {
    --button-background: transparent;
    border: 1px solid #ff000059;
    color: var(--colors-light-warning);
  }

  :host([background="red"][variant="transparent"][filling])
    .awc-button
    ::slotted(awc-icon) {
    fill: var(--colors-light-warning);
  }

  :host([background="red"][variant="transparent"]:not([disabled]))
    .awc-button:hover {
    --button-background: var(--global-red-500);
    color: var(--colors-light-white);
  }

  :host([background="red"][variant="transparent"][filling])
    .awc-button:hover
    ::slotted(awc-icon) {
    fill: var(--colors-light-white);
  }

  :host([background="green"][variant="transparent"]) .awc-button {
    --button-background: transparent;
    border: 1px solid #35d3ac59;
    color: var(--colors-light-success);
  }

  :host([background="green"][variant="transparent"][filling])
    .awc-button
    ::slotted(awc-icon) {
    fill: var(--colors-light-success);
  }

  :host([background="green"][variant="transparent"]:not([disabled]))
    .awc-button:hover {
    background-color: var(--global-green-400);
    color: var(--colors-light-white);
  }

  :host([background="green"][variant="transparent"][filling])
    .awc-button:hover
    ::slotted(awc-icon) {
    fill: var(--colors-light-white);
  }

  :host([background="gray"][variant="transparent"]) .awc-button {
    --button-background: transparent;
    border: 1px solid var(--colors-light-stroke-hover);
    color: var(--colors-light-text);
  }

  :host([background="gray"][variant="transparent"][filling])
    .awc-button
    ::slotted(awc-icon) {
    fill: var(--colors-light-text);
  }

  :host([background="gray"][variant="transparent"]:not([disabled]))
    .awc-button:hover {
    border-color: var(--colors-light-secondary-hover);
    --button-background: var(--colors-light-secondary-hover);
    color: var(--colors-light-white);
  }

  :host([background="gray"][variant="transparent"][filling])
    .awc-button:hover
    ::slotted(awc-icon) {
    fill: var(--colors-light-white);
  }

  /* Color link */
  :host([background="blue"][variant="link"]) .awc-button {
    --button-background: transparent;
    color: var(--colors-light-primary);
  }

  :host([background="blue"][variant="link"][filling])
    .awc-button
    ::slotted(awc-icon) {
    fill: var(--colors-light-primary);
  }

  :host([background="blue"][variant="link"]:not([disabled])) .awc-button:hover {
    --button-background: rgba(55, 97, 233, 0.1);
    color: var(--colors-light-primary);
  }

  :host([background="blue"][variant="link"][filling])
    .awc-button:hover
    ::slotted(awc-icon) {
    fill: var(--colors-light-primary);
  }

  :host([background="red"][variant="link"]) .awc-button {
    --button-background: var(--colors-light-white);
    color: var(--colors-light-warning);
  }

  :host([background="red"][variant="link"][filling])
    .awc-button
    ::slotted(awc-icon) {
    fill: var(--colors-light-warning);
  }

  :host([background="red"][variant="link"]:not([disabled])) .awc-button:hover {
    --button-background: rgba(255, 0, 0, 0.1);
    color: var(--colors-light-warning);
  }

  :host([background="red"][variant="link"][filling])
    .awc-button:hover
    ::slotted(awc-icon) {
    fill: var(--colors-light-warning);
  }

  :host([background="green"][variant="link"]) .awc-button {
    --button-background: var(--colors-light-white);
    color: var(--colors-light-success);
  }

  :host([background="green"][variant="link"][filling])
    .awc-button
    ::slotted(awc-icon) {
    fill: var(--colors-light-success);
  }

  :host([background="green"][variant="link"]:not([disabled]))
    .awc-button:hover {
    --button-background: rgba(53, 211, 172, 0.1);
    color: var(--colors-light-success);
  }

  :host([background="green"][variant="link"][filling])
    .awc-button:hover
    ::slotted(awc-icon) {
    fill: var(--colors-light-success);
  }

  :host([background="gray"][variant="link"]) .awc-button {
    --button-background: var(--colors-light-white);
    color: var(--colors-light-text);
  }

  :host([background="gray"][variant="link"][filling])
    .awc-button
    ::slotted(awc-icon) {
    fill: var(--colors-light-text);
  }

  :host([background="gray"][variant="link"]:not([disabled])) .awc-button:hover {
    --button-background: rgba(145, 155, 182, 0.1);
    color: var(--colors-light-white);
  }

  :host([background="gray"][variant="link"][filling])
    .awc-button:hover
    ::slotted(awc-icon) {
    fill: var(--colors-light-white);
  }

  /* Size */

  :host([size="large"]) .awc-button {
    padding: 0 20px;
    height: 40px;
    font: var(--awc-font-text-medium-14);
  }

  :host([size="regular"]) .awc-button {
    padding: 0 16px;
    height: 36px;
    font: var(--awc-font-caption-1-medium);
  }

  :host([size="small"]) .awc-button {
    padding: 0 12px;
    height: 30px;
    font: var(--awc-font-caption-2-regular);
  }

  :host([size="extrasmall"]) .awc-button {
    padding: 0 10px;
    height: 24px;
    font: var(--awc-font-caption-3-regular);
  }
`,
  ja = w`
    :host {
        display: inline-flex; 
    }

    :host([size="s"]){
        --awc-spinner-size: 16px;
        --awc-spinner-border-width: 2px;
    }

    :host([size="m"]){
        --awc-spinner-size: 20px;
        --awc-spinner-border-width: 2.5px;
    }

    :host([size="l"]){
        --awc-spinner-size: 28px;
        --awc-spinner-border-width: 3px;
    }

    :host([variant="primary"]){
        --awc-spinner-thumb: rgba(55, 97, 233, 0.12);
        --awc-spinner-track: var(--colors-light-primary);
    }

    :host([variant="secondary"]){
        --awc-spinner-thumb: rgba(255, 255, 255, 0.12);
        --awc-spinner-track: var(--colors-light-white);
    }

    .awc-spinner {
        position: relative;
        width: var(--awc-spinner-size);
        height: var(--awc-spinner-size);
        border: var(--awc-spinner-border-width) solid var(--awc-spinner-thumb);
        border-bottom-color: var(--awc-spinner-track);
        border-radius: 50%;
        display: inline-block;
        box-sizing: border-box;
        animation: awc-spinner .8s linear infinite;
    }

    @keyframes awc-spinner {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }

`
var za = Object.defineProperty,
  Ra = Object.getOwnPropertyDescriptor,
  uo = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? Ra(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && za(e, r, o), o
  }
const Bi = 'awc-spinner'
let We = class extends u {
  constructor() {
    super(...arguments), (this.size = 'm'), (this.variant = 'primary')
  }
  render() {
    return l`
            <div class="awc-spinner"></div>
        `
  }
}
We.styles = [ja]
uo([n({ type: String, reflect: !0 })], We.prototype, 'size', 2)
uo([n({ type: String, reflect: !0 })], We.prototype, 'variant', 2)
We = uo([f(Bi)], We)
var Fa = Object.defineProperty,
  Va = Object.getOwnPropertyDescriptor,
  ot = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? Va(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && Fa(e, r, o), o
  }
const Ii = 'awc-button'
let X = class extends u {
  constructor() {
    super(...arguments),
      (this.background = 'blue'),
      (this.size = 'regular'),
      (this.variant = 'primary'),
      (this.type = 'submit'),
      (this.target = '_self'),
      (this.disabled = !1),
      (this.filling = !1),
      (this.loading = !1),
      (this.autofocus = !1)
  }
  /**
   * @cssproperty [--awc-button-display:block] Устанавливает блочное отображение кнопки
   */
  get spinner() {
    return this.querySelector(Bi)
  }
  focus() {
    this.button.focus()
  }
  _handleButtonClick() {
    const t = this.closest('form')
    t && (this.type === 'submit' ? Yr(t) : this.type === 'reset' && t.reset())
  }
  _renderSpinner() {
    const t = this.variant === 'primary' ? 'secondary' : 'primary'
    return l`<awc-spinner size="s" variant=${t}></awc-spinner>`
  }
  _settingCurrentSpinnerVariant() {
    this.spinner
      ? (this.button.classList.add('awc-button--disable'),
        this.variant === 'primary'
          ? (this.spinner.variant = 'secondary')
          : (this.spinner.variant = 'primary'))
      : this.button.classList.remove('awc-button--disable')
  }
  _checkingSpinnerInSlot() {
    this.spinner
      ? this._settingCurrentSpinnerVariant()
      : this.button.classList.remove('awc-button--disable')
  }
  updated(t) {
    super.updated(t), t.has('variant') && this._settingCurrentSpinnerVariant()
  }
  render() {
    const t = l`
      <slot @slotchange="${this._checkingSpinnerInSlot}"></slot>
      ${this.loading ? this._renderSpinner() : ''}
    `,
      e = l`
     <button
        class="awc-button"
        ?filling=${this.filling}
        ?autofocus=${this.autofocus}
        type=${this.type}
        name=${F(this.name)}
        value=${F(this.value)}
        tabindex="0"
        background=${this.background}
        ?disabled=${this.disabled}
        @focus=${this.focus}
        @click=${this._handleButtonClick}
      >
       ${t}
      </button>
    `,
      r = l`
     <a
        class="awc-button"
        ?filling=${this.filling}
        ?autofocus=${this.autofocus}
        tabindex="0"
        background=${this.background}
        ?disabled=${this.disabled}
        href=${this.href}
        @focus=${this.focus}
        target=${F(this.target)}
        @click=${this._handleButtonClick}
      >
      ${t}
     </a>
    `
    return this.href ? r : e
  }
}
X.styles = [Ma]
ot([n({ type: String, reflect: !0 })], X.prototype, 'name', 2)
ot([n({ type: String, reflect: !0 })], X.prototype, 'value', 2)
ot([n({ type: String, reflect: !0 })], X.prototype, 'background', 2)
ot([n({ type: String, reflect: !0 })], X.prototype, 'size', 2)
ot([n({ type: String, reflect: !0 })], X.prototype, 'variant', 2)
ot([n({ type: String, reflect: !0 })], X.prototype, 'type', 2)
ot([n({ type: String })], X.prototype, 'target', 2)
ot([n({ type: String, reflect: !0 })], X.prototype, 'href', 2)
ot([n({ type: Boolean, reflect: !0 })], X.prototype, 'disabled', 2)
ot([n({ type: Boolean, reflect: !0 })], X.prototype, 'filling', 2)
ot([n({ type: Boolean, reflect: !0 })], X.prototype, 'loading', 2)
ot([n({ type: Boolean, reflect: !0 })], X.prototype, 'autofocus', 2)
ot([Y()], X.prototype, 'pointerEvent', 2)
ot([S('.awc-button')], X.prototype, 'button', 2)
X = ot([f(Ii)], X)
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const qa = (t) => t.strings === void 0,
  Ha = {},
  Ua = (t, e = Ha) => (t._$AH = e)
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ir = co(
    class extends po {
      constructor(t) {
        if (
          (super(t),
          t.type !== Nt.PROPERTY && t.type !== Nt.ATTRIBUTE && t.type !== Nt.BOOLEAN_ATTRIBUTE)
        )
          throw Error('The `live` directive is not allowed on child or event bindings')
        if (!qa(t)) throw Error('`live` bindings can only contain a single expression')
      }
      render(t) {
        return t
      }
      update(t, [e]) {
        if (e === pt || e === V) return e
        const r = t.element,
          i = t.name
        if (t.type === Nt.PROPERTY) {
          if (e === r[i]) return pt
        } else if (t.type === Nt.BOOLEAN_ATTRIBUTE) {
          if (!!e === r.hasAttribute(i)) return pt
        } else if (t.type === Nt.ATTRIBUTE && r.getAttribute(i) === e + '') return pt
        return Ua(t), e
      }
    }
  ),
  Na = w`
    :host{
      display: inline-flex;
      position: relative;
    }

    .awc-checkbox__wrapper{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    
    .awc-checkbox__container{
      display: flex;
    }

    /* :host([focused]:hover) span {
      background-color: var(--colors-light-primary-hover);
      border-color: var(--colors-light-primary-hover);
    } */

    .awc-checkbox__label:hover .awc-checkbox {
      transition: background-color 0.2s, border-color 0.2s;
      background-color: var(--colors-light-stroke-hover);
    }

    :host([checked]) .awc-checkbox {
      border-color: var(--colors-light-primary);
      background-color: var(--colors-light-primary);
      transition: background-color 0.3s ease-out, border-color 0.3s ease-out;
    }

    :host([checked]) .awc-checkbox__label:hover .awc-checkbox {
      transition: background-color 0.2s, border-color 0.2s;
      background-color: var(--colors-light-primary-hover);
    }

    :host([disabled]) .awc-checkbox,
    :host([disabled]) .awc-checkbox__label,
    :host([disabled]) .checkbox {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    :host([disabled]:hover) .awc-checkbox {
      background-color: var(--colors-light-white);
    }

    :host([disabled][checked]:hover) .awc-checkbox {
      background-color: var(--colors-light-primary);
      border-color: var(--colors-light-primary);
    }

    .awc-checkbox {
      border-radius: var(--corner-radius-s);
      border: 1px solid var(--colors-light-stroke);
      background-color: var(--colors-light-white);
      cursor: pointer;
      position: absolute;
      width: 18px;
      height: 18px;
      transition: background-color 0.3s ease, border-color 0.3s ease-out;
    }

    .awc-checkbox::after {
      display: flex;
      justify-content: center;
      align-items: center;
      max-height: 22px;
      scale: 0;
      transition: 0.2s ease;
      content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M6 10L9 13L15 7' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    }

    :host([checked]) .awc-checkbox::after {
      transition: 0.2s ease;
      scale: 1;
    }

    .checkbox {
      opacity: 1;
      cursor: pointer;
      margin: 0;
      align-self: stretch;
      -webkit-appearance: none;
      width: 20px;
      height: 20px;
      border-radius: var(--corner-radius-s);
      position: relative;
    }

    :host .checkbox:focus {
      outline: none;
    } 

    .checkbox:focus-visible {
      border: 1px solid var(--colors-light-focus);
    } 

    /* 
    :host .checkbox[required]:focus {
      border-radius: var(--corner-radius-s);
      border: 1px solid var(--colors-light-warning);
    }  
    */

    /* :host .checkbox:focus-visible::before{
      content: '';
      position: absolute;
      border: 3px solid #839FF633; 
      inset: -3px;
      border-radius: var(--corner-radius-m);
      pointer-events: none;
    }

    :host([checked]) .checkbox:focus-visible {
      border: 1px solid var(--colors-light-primary);
    }  */

    .awc-checkbox__label {
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      color: var(--colors-light-text);
      font: var(--awc-font-text-regular-14);
    }

    :host([static-error]) .awc-checkbox__label.checkbox--error,
    .awc-checkbox__label.checkbox--error {
      color: var(--colors-light-warning);
    }

    .awc-checkbox__error{
      margin-top: var(--spacing-s);
      font: var(--awc-font-caption-1-regular);
      color: var(--colors-light-warning);
    }

    .checkbox.checkbox--error{
      border: 1px solid var(--colors-light-warning);
    } 

    :host([static-error][custom-error][required]) .awc-checkbox  {
      border-color: var(--colors-light-warning);
    }
`
var Wa = Object.defineProperty,
  Ga = Object.getOwnPropertyDescriptor,
  J = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? Ga(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && Wa(e, r, o), o
  }
const Ti = 'awc-checkbox'
let q = class extends kt(u) {
  constructor() {
    super(...arguments),
      (this.label = ''),
      (this.name = ''),
      (this.checked = !1),
      (this.required = !1),
      (this.disabled = !1),
      (this.indeterminate = !1),
      (this.staticError = !1),
      (this.customError = ''),
      (this.validationMessage = ''),
      (this._handleFieldValueChange = (t) => {
        this.checked = t.detail.includes(this.value)
      }),
      (this._onInvalid = (t) => {
        t.preventDefault(), this.validationTarget.focus()
      })
  }
  validityCallback() {
    var t
    return (t = this.validationTarget) == null ? void 0 : t.validationMessage
  }
  validationMessageCallback(t) {
    this.customError && !this.staticError
      ? ((this.validationMessage = t), (this.validationMessage = this.customError))
      : (this.validationMessage = t)
  }
  resetFormControl() {
    this.checked = !1
  }
  shouldFormValueUpdate() {
    return this.checked
  }
  updated(t) {
    super.updated(t), (t.has('checked') || t.has('value')) && this.setValue(this.value)
  }
  connectedCallback() {
    super.connectedCallback(),
      this.addEventListener('invalid', this._onInvalid),
      yi(() => {
        ;(this.field = this.closest(Di)),
          this.field && this.addEventListener(Wo, this._handleFieldValueChange)
      })
  }
  disconnectedCallback() {
    var t
    super.disconnectedCallback(),
      this.removeEventListener('invalid', this._onInvalid),
      (t = this.field) == null || t.removeEventListener(Wo, this._handleFieldValueChange)
  }
  focus() {
    ;(this.checkboxElement.tabIndex = 0), this.checkboxElement.focus(), this.onFocus(this.value)
  }
  blur() {
    this.onBlur(this.value), this.field && (this.checkboxElement.tabIndex = -1)
  }
  _handleChange(t) {
    const e = t.target
    e.checkValidity(),
      (this.checked = e.checked),
      this.onChange(e.checked),
      this.dispatchEvent(new Event('change', { bubbles: !0, composed: !0 })),
      (this.indeterminate = !1)
  }
  render() {
    const t = {
        checkbox: !0,
        'checkbox--error': this.showError
      },
      e = {
        'awc-checkbox__label': !0,
        'checkbox--error': this.showError || (this.staticError && this.required)
      }
    return l`
      <div class="awc-checkbox__wrapper">
        <label class="${et(e)}">${this.label}
          <div class="awc-checkbox__container">
            <span class="awc-checkbox"></span>
            <input
              class="${et(t)}"
              type="checkbox"
              label=${this.label}
              name=${this.name}
              value=${F(this.value)}
              .checked=${ir(this.checked)}
              ?disabled=${this.disabled}
              ?required=${this.required}
              .indeterminate=${this.indeterminate}
              @change=${this._handleChange}
              @blur=${this.blur}
             />
          </div>
        </label>

          ${this.showError && this.required && !this.staticError ? l`<span class="awc-checkbox__error">${this.validationMessage}</span>` : ''}

          ${this.staticError && this.required && this.customError ? l`<span class="awc-checkbox__error">${this.customError}</span>` : ''}
      </div>
    `
  }
}
q.shadowRootOptions = { ...u.shadowRootOptions, delegatesFocus: !0 }
q.formControlValidators = [Dr]
q.styles = [Na]
J([n({ type: String, reflect: !0 })], q.prototype, 'value', 2)
J([n({ type: String, reflect: !0 })], q.prototype, 'label', 2)
J([n({ type: String, reflect: !0 })], q.prototype, 'name', 2)
J([n({ type: Boolean, reflect: !0 })], q.prototype, 'checked', 2)
J([n({ type: Boolean, reflect: !0 })], q.prototype, 'required', 2)
J([n({ type: Boolean, reflect: !0 })], q.prototype, 'disabled', 2)
J([n({ type: Boolean, reflect: !0 })], q.prototype, 'indeterminate', 2)
J([n({ type: Boolean, reflect: !0, attribute: 'static-error' })], q.prototype, 'staticError', 2)
J([n({ reflect: !0, attribute: 'custom-error' })], q.prototype, 'customError', 2)
J([Y()], q.prototype, 'validationMessage', 2)
J([P('awc-checkbox-change')], q.prototype, 'onChange', 2)
J([P('awc-focus')], q.prototype, 'onFocus', 2)
J([P('awc-blur')], q.prototype, 'onBlur', 2)
J([S('input')], q.prototype, 'checkboxElement', 2)
J([S('label')], q.prototype, 'labelCheckboxElement', 2)
J([S('input[type=checkbox]')], q.prototype, 'validationTarget', 2)
q = J([f(Ti)], q)
const Za = w`
    .awc-checkbox-group{
        display: flex;
        flex-direction: column;
        gap: 9px;
    }

    .awc-checkbox-group__label{
        color: var(--colors-light-titles);
        font: var(--awc-font-text-medium-14);
    }

    .awc-checkbox-group__options{
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .awc-checkbox-group__hint {
        margin-top: var(--spacing-s);
        font: var(--awc-font-caption-1-regular);
        color: var(--colors-light-secondary);
    }
`
var Xa = Object.defineProperty,
  Ka = Object.getOwnPropertyDescriptor,
  sr = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? Ka(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && Xa(e, r, o), o
  }
const Di = 'awc-checkbox-group',
  Wo = 'awc-checkbox-group-change'
let ce = class extends kt(u) {
  constructor() {
    super(...arguments),
      (this.value = []),
      (this.label = ''),
      (this.hint = ''),
      (this.focusedOptionIndex = 0)
  }
  get options() {
    return [...this.querySelectorAll(Ti)]
  }
  get checkedOptions() {
    return this.options.filter((t) => t.checked).map((t) => t.value)
  }
  get availableOptions() {
    return this.options.filter((t) => !t.disabled)
  }
  connectedCallback() {
    super.connectedCallback(),
      (this.tabIndex = 0),
      this._handleCheckboxItem(),
      this.addEventListener('focus', this.handleFocus),
      this.addEventListener('keydown', this.handleKeyDown)
  }
  disconnectedCallback() {
    super.disconnectedCallback(),
      this.removeEventListener('focus', this.handleFocus),
      this.removeEventListener('keydown', this.handleKeyDown)
  }
  updated(t) {
    super.updated(t),
      t.has('value') && (this.setValue(this.checkedOptions.join(', ')), this._onChange(this.value))
  }
  _handleCheckboxItem() {
    this.value = this.checkedOptions
  }
  handleKeyDown(t) {
    if (['ArrowDown', 'ArrowRight'].includes(t.key)) this.focusedOptionIndex++
    else if (['ArrowUp', 'ArrowLeft'].includes(t.key)) this.focusedOptionIndex--
    else if (t.key === 'Tab') {
      if (
        (t.shiftKey ? this.focusedOptionIndex-- : this.focusedOptionIndex++,
        this.focusedOptionIndex === this.availableOptions.length)
      ) {
        ;(this.tabIndex = 0), (this.focusedOptionIndex = 0)
        return
      }
    } else return
    ;(this.focusedOptionIndex = Math.max(
      0,
      Math.min(this.focusedOptionIndex, this.availableOptions.length - 1)
    )),
      this.availableOptions[this.focusedOptionIndex].focus(),
      t.preventDefault()
  }
  handleFocus() {
    this.availableOptions[this.focusedOptionIndex].focus()
  }
  render() {
    return l`
        <div class="awc-checkbox-group"
            role="group"
            aria-labelledby="label"
            .value="${ir(this.value)}">
            <legend class="awc-checkbox-group__label">${this.label}</legend>
                <div class="awc-checkbox-group__options"
                    @awc-checkbox-change=${this._handleCheckboxItem}>
                <slot></slot>
            </div>
            ${this.hint ? l`<span class="awc-checkbox-group__hint">${this.hint}</span>` : ''}
        </div>
    `
  }
}
ce.styles = [Za]
sr([n({ type: Array, reflect: !0 })], ce.prototype, 'value', 2)
sr([n({ type: String, reflect: !0 })], ce.prototype, 'label', 2)
sr([n({ type: String, reflect: !0 })], ce.prototype, 'hint', 2)
sr([P('awc-checkbox-group-change')], ce.prototype, '_onChange', 2)
ce = sr([f(Di)], ce)
const Ya = w`
  .awc-switcher__title {
    margin: 0;
    color: var(--colors-light-titles);
    font: var(--awc-font-text-medium-14);
  }

  .awc-switcher__label {
    cursor: pointer;
    display: inline-flex;
    gap: 12px;
    color: var(--colors-light-text);
    font: var(--awc-font-text-regular-14);
  }

  .awc-switch {
    position: relative;
    cursor: pointer;
    width: calc(35px - 2px);
    height: 18px;
    background-color: var(--colors-light-stroke);
    display: flex;
    align-items: center;
    border-radius: var(--corner-radius-circular);
    transition: background-color .3s ease-in-out;
    border: 1px solid transparent;
  }

  .awc-switch:focus-visible {
    outline: 1px solid var(--colors-light-focus);
  }

  /* .awc-switch:focus-visible .awc-switch__focus {
    content: '';
    position: absolute;
    border: 3px solid #839FF633; 
    inset: -3px;
    border-radius: var(--corner-radius-circular);
    pointer-events: none;
  } */

  /* TODO add gray color variable */
  :host([variant='gray'][checked]) .awc-switch {
    background-color: #929bb6;
  }

  :host([variant='gray'][checked]:hover) .awc-switch {
    background-color: #929bb6;
    opacity: 0.90;
  }

  :host([variant='white']) .awc-switch {
    border: 1px solid transparent;
  }

  :host([variant='white'][checked]) .awc-switch {
    background-color: var(--colors-light-white);
    border: 1px solid #929bb6;  
  }

  :host([variant='white'][checked]:hover) .awc-switch {
    background-color: var(--colors-light-white);
    opacity: 0.90;
  }

  :host([variant='white'][checked]) .awc-switch::before {
    background-color: #929bb6;
  }

  .awc-switch::before {
    content: "";
    position: relative;
    left: 3px;
    width: 14px;
    height: 14px;
    background-color: #fff;
    border-radius: var(--corner-radius-circular);
    transition: transform .3s ease;
  }

  :host([checked]) .awc-switch::before {
    transform: translateX(100%);
  }

  :host(:hover) .awc-switch {
    background-color: var(--colors-light-stroke-hover);
  }

  :host([checked]) .awc-switch {
    background-color: var(--colors-light-primary);
  }
  :host([checked]) .awc-switch::after {
    transform: translateX(100%);
  }

  :host([checked]:hover) .awc-switch {
    background-color: var(--colors-light-primary-hover);
  }

  :host([disabled]) {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  :host([disabled]:hover) .awc-switch {
    background-color: var(--colors-light-stroke);
  }

  :host([disabled][checked]:hover) .awc-switch {
    background-color: var(--colors-light-primary);
  }
`
var Ja = Object.defineProperty,
  Qa = Object.getOwnPropertyDescriptor,
  we = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? Qa(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && Ja(e, r, o), o
  }
let jt = class extends kt(u) {
  constructor() {
    super(...arguments), (this.checked = !1), (this.disabled = !1), (this.variant = 'primary')
  }
  _onChange() {
    this.dispatchEvent(new Event('change', { composed: !0, bubbles: !0 }))
  }
  _handleToggle() {
    this.disabled ||
      ((this.checked = !this.checked), this._onToggle(this.checked), this._onChange())
  }
  _handleKeyDown(t) {
    ;(t.code === 'Enter' || t.code === 'Space') && (this._handleToggle(), t.preventDefault())
  }
  resetFormControl() {
    this.checked = !1
  }
  shouldFormValueUpdate() {
    return this.checked
  }
  updated(t) {
    super.updated(t), (t.has('checked') || t.has('value')) && this.setValue(this.value)
  }
  render() {
    return l`
      <label class="awc-switcher__label" @click=${this._handleToggle}>
       
        <span
          class="awc-switch"
          role="switch"
          ?checked=${this.checked}
          aria-readonly=${!!this.disabled}
          @keydown=${this._handleKeyDown}
          tabindex="0"
        >
        <div class="awc-switch__focus"></div>
        </span>
        <slot class="label"></slot>
      </label>
    `
  }
}
jt.styles = [Ya]
we([n({ type: Boolean, reflect: !0 })], jt.prototype, 'checked', 2)
we([n({ type: Boolean, reflect: !0 })], jt.prototype, 'disabled', 2)
we([n({ type: String, reflect: !0 })], jt.prototype, 'name', 2)
we([n({ type: String, reflect: !0 })], jt.prototype, 'value', 2)
we([n({ type: String, reflect: !0 })], jt.prototype, 'variant', 2)
we([P('awc-switcher-toggle')], jt.prototype, '_onToggle', 2)
jt = we([f('awc-switcher')], jt)
const tn = w`
  :host {
    --spacing-none: 0;
  }

  .awc-divider {
    position: relative;
    padding: var(--awc-divider-spacing) 0;
    text-align: center;
    color: var(--colors-light-secondary);
  }

  .awc-divider__line {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background-color: var(--colors-light-stroke);
  }

  .awc-divider__text::before {
    content: "";
    top: 50%;
    left: 0;
    height: 1px;
    width: 100%;
    background-color: var(--colors-light-stroke);
  }

  .awc-divider__text {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 11px;
    font: var(--awc-font-caption-1-regular);
    position: relative;
    white-space: nowrap;
  }

  .awc-divider__text::after {
    content: "";
    top: 50%;
    right: 0;
    height: 1px;
    width: 100%;
    background-color: var(--colors-light-stroke);
  }
`
var en = Object.defineProperty,
  rn = Object.getOwnPropertyDescriptor,
  vo = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? rn(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && en(e, r, o), o
  }
let Ge = class extends u {
  constructor() {
    super(...arguments), (this.spacing = 'l')
  }
  render() {
    return l`
      <div class="awc-divider" style="--awc-divider-spacing: var(--spacing-${this.spacing});">
        ${this.label ? l`<span class="awc-divider__text">${this.label}</span>` : l`<div class="awc-divider__line"></div>`}
      </div>
    `
  }
}
Ge.styles = [tn]
vo([n({ type: String, reflect: !0 })], Ge.prototype, 'label', 2)
vo([n({ type: String, reflect: !0 })], Ge.prototype, 'spacing', 2)
Ge = vo([f('awc-divider')], Ge)
const on = w`
  :host {
    --small: calc(36px - 20px);
    --medium: calc(40px - 20px);
    --large: calc(48px - 20px);
  }

  .awc-input__main {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .awc-input__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .awc-input__slot ::slotted(*) {
    padding-left: var(--spacing-s);
  }

  .awc-input__container {
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
  }

  .awc-input {
    position: relative;
    max-width: 100%;
    border: none;
    padding: 10px 14px;
    font: var(--awc-font-text-regular-15);
    color: var(--colors-light-text);
    background: var(--colors-light-input-background);
    border-radius: var(--corner-radius-m);
    transition:
      background-color 0.25s ease,
      border-color 0.25s ease;
  }

  .awc-input.small {
    height: var(--small);
  }

  .awc-input.medium {
    height: var(--medium);
  }

  .awc-input.large {
    height: var(--large);
  }

  .awc-input::placeholder {
    color: var(--colors-light-secondary);
  }

  .awc-input:hover {
    background: var(--colors-light-stroke);
  }

  .awc-input:focus {
    outline: 1px solid var(--colors-light-focus);
  }

  /* .awc-input:focus {
    outline: none;
    background: var(--colors-light-white);
    border: 1px solid #839ff6;
  }

  .awc-input:focus + .awc-input__focus {
    content: "";
    z-index: 1;
    position: absolute;
    border: 3px solid #839ff633;
    inset: -3px;
    border-radius: var(--corner-radius-l);
    pointer-events: none;
  } */

  .awc-input__label {
    max-width: max-content;
    display: inline-block;
    padding: 0;
    margin-bottom: var(--spacing-s);
    font: var(--awc-font-text-medium-14);
    color: var(--colors-light-titles);
  }

  :host([required]) .awc-input__label::after {
    content: "*";
    color: var(--colors-light-warning);
    margin-left: 4px;
  }

  :host([disabled]) .awc-input {
    opacity: 0.5;
    cursor: not-allowed;
  }

  :host([readonly]) .awc-input {
    cursor: not-allowed;
  }

  .awc-input__password {
    display: flex;
    position: absolute;
    border: none;
    padding: 0;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    cursor: pointer;
  }

  .awc-input.has-padding-icon {
    padding: 9.5px 55px 9.5px 14px;
  }

  .awc-input__progress {
    display: flex;
    align-items: stretch;
    justify-content: flex-end;
    width: 22px;
    height: 22px;
    border-radius: var(--corner-radius-circular);
    position: absolute;
    border: none;
    padding: 0;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    transition: background 0.4s ease;
    background: conic-gradient(
      var(--colors-light-primary) var(--progress),
      var(--colors-light-stroke) 0deg
    );
  }

  .awc-input__progress.awc-input__progress--percent {
    background: conic-gradient(
      var(--colors-light-secondary) var(--progress),
      var(--colors-light-stroke) 0deg
    );
  }

  .awc-input__progress::before {
    content: attr(length);
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border-radius: 50%;
    background-color: var(--colors-light-white);
    margin: 3px;
    width: 100%;
  }

  .awc-input__progress.awc-input__progress--length-warning {
    background: var(--colors-light-warning);
  }

  .awc-input__progress--length-warning.awc-input__progress::before {
    background: none;
    color: var(--colors-light-white);
    font: var(--awc-font-caption-3-regular);
    letter-spacing: -0.5px;
  }

  .awc-input__progress--length-warning.awc-input__progress--small-font.awc-input__progress::before {
    font-size: 8px;
  }

  .awc-input__error,
  .awc-input__hint {
    margin-top: var(--spacing-s);
    font: var(--awc-font-caption-1-regular);
  }

  .awc-input__hint {
    color: var(--colors-light-secondary);
  }

  .awc-input__error {
    color: var(--colors-light-warning);
  }

  .awc-input.awc-input--error {
    border-color: var(--colors-light-warning);
  }

  :host([static-error][custom-error][required]) .awc-input {
    border-color: var(--colors-light-warning);
  }
`
var sn = Object.defineProperty,
  an = Object.getOwnPropertyDescriptor,
  D = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? an(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && sn(e, r, o), o
  }
const nn = 'awc-input'
let A = class extends kt(u) {
  constructor() {
    super(...arguments),
      (this.value = ''),
      (this.placeholder = 'Placeholder'),
      (this.type = 'text'),
      (this.size = 'medium'),
      (this.customError = ''),
      (this.autocomplete = 'off'),
      (this.autofocus = !1),
      (this.required = !1),
      (this.disabled = !1),
      (this.readonly = !1),
      (this.staticError = !1),
      (this.validationMessage = ''),
      (this.inputId = Math.random().toString(36).substring(2))
  }
  validityCallback() {
    var t
    return (t = this.validationTarget) == null ? void 0 : t.validationMessage
  }
  validationMessageCallback(t) {
    this.customError && !this.staticError
      ? ((this.validationMessage = t), (this.validationMessage = this.customError))
      : (this.validationMessage = t)
  }
  resetFormControl() {
    this.validationTarget.value = ''
  }
  _changeVisibilityPassword() {
    if (this.input && this._passwordButton) {
      this.input.type = this.input.type === 'password' ? 'text' : 'password'
      const t =
        this.input.type === 'password'
          ? '<path fill-rule="evenodd" clip-rule="evenodd" d="M1.88016 4.52534C1.61801 4.03924 1.01143 3.85769 0.525328 4.11984C0.0392261 4.382 -0.142322 4.98858 0.119829 5.47468C0.460909 6.10714 0.886046 6.69103 1.38093 7.21455C1.35044 7.23864 1.32104 7.26476 1.29289 7.2929L0.292888 8.2929C-0.097636 8.68343 -0.097636 9.31659 0.292888 9.70712C0.683413 10.0976 1.31658 10.0976 1.7071 9.70712L2.7071 8.70712C2.77745 8.63677 2.83512 8.55856 2.88012 8.47531C3.49551 8.88444 4.16892 9.22105 4.8856 9.47295L4.51941 11.3039C4.4111 11.8455 4.76232 12.3723 5.30388 12.4806C5.84544 12.5889 6.37226 12.2377 6.48058 11.6961L6.83405 9.92873C7.21597 9.97577 7.6052 10 7.99999 10C8.39479 10 8.78401 9.97577 9.16594 9.92873L9.51941 11.6961C9.62773 12.2377 10.1546 12.5889 10.6961 12.4806C11.2377 12.3723 11.5889 11.8455 11.4806 11.3039L11.1144 9.47295C11.8311 9.22105 12.5045 8.88444 13.1199 8.47531C13.1649 8.55856 13.2225 8.63677 13.2929 8.70712L14.2929 9.70712C14.6834 10.0976 15.3166 10.0976 15.7071 9.70712C16.0976 9.31659 16.0976 8.68343 15.7071 8.2929L14.7071 7.2929C14.679 7.26476 14.6495 7.23864 14.6191 7.21455C15.1139 6.69103 15.5391 6.10714 15.8802 5.47468C16.1423 4.98858 15.9608 4.382 15.4747 4.11984C14.9886 3.85769 14.382 4.03924 14.1198 4.52534C13.0235 6.55825 10.7156 8.00001 7.99999 8.00001C5.2844 8.00001 2.97649 6.55825 1.88016 4.52534Z" fill="#919BB6"/>'
          : '<path fill-rule="evenodd" clip-rule="evenodd" d="M0.0827055 8.39823L0.0783361 8.388C0.0249487 8.26125 -0.00032161 8.12958 -0.000259399 8.00001C-0.000324169 7.87043 0.0249465 7.73876 0.0783366 7.612L0.0827063 7.60177C1.48797 4.34653 4.46036 2 8 2C11.5396 2 14.5119 4.34645 15.9172 7.60162L15.9217 7.612C15.975 7.73875 16.0003 7.87042 16.0003 8C16.0003 8.12958 15.975 8.26125 15.9217 8.388L15.9172 8.39838C14.5119 11.6536 11.5396 14 8 14C4.46036 14 1.48797 11.6535 0.0827055 8.39823ZM8 4C10.4635 4 12.6941 5.55711 13.8989 8C12.6941 10.4429 10.4635 12 8 12C5.53648 12 3.30588 10.4429 2.10113 8C3.30588 5.55711 5.53648 4 8 4ZM8.99999 8C8.99999 8.55228 8.55228 9 7.99999 9C7.44771 9 6.99999 8.55228 6.99999 8C6.99999 7.44772 7.44771 7 7.99999 7C8.55228 7 8.99999 7.44772 8.99999 8ZM11 8C11 9.65685 9.65685 11 7.99999 11C6.34314 11 4.99999 9.65685 4.99999 8C4.99999 6.34315 6.34314 5 7.99999 5C9.65685 5 11 6.34315 11 8Z" fill="#919BB6"/>'
      this._passwordButton.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          ${t}
        </svg>
      `
    }
  }
  _updateCharacterLimit() {
    if (this.input && this._progressBar && this.maxlength !== void 0) {
      const t = this.maxlength,
        e = this.value.length,
        r = (e / t) * 360
      if (
        ((e * 100) / t > 70
          ? this._progressBar.classList.add('awc-input__progress--percent')
          : this._progressBar.classList.remove('awc-input__progress--percent'),
        this._progressBar.style.setProperty('--progress', `${r}deg`),
        t < e)
      ) {
        const o = t - e
        this._progressBar.setAttribute('length', `${o}`),
          this._progressBar.classList.add('awc-input__progress--length-warning'),
          o < -99
            ? this._progressBar.classList.add('awc-input__progress--small-font')
            : this._progressBar.classList.remove('awc-input__progress--small-font')
      } else
        this._progressBar.removeAttribute('length'),
          this._progressBar.classList.remove('awc-input__progress--length-warning')
    }
  }
  _paddingInputIcon() {
    ;((this.input && this._passwordButton) || (this.input && this._progressBar)) &&
      this.input.classList.add('has-padding-icon')
  }
  _onKeyDown(t) {
    if (t.code === 'Enter' && this.form) {
      t.preventDefault()
      const e = this.form.querySelector("button[type='submit']"),
        r = this.form.querySelector("awc-button[type='submit']")
      e
        ? setTimeout(() => e.click())
        : r
          ? (setTimeout(() => r.click()), Yr(this.form))
          : Yr(this.form)
    }
  }
  _onInput(t) {
    ;(this.value = t.target.value),
      this.dispatchEvent(new InputEvent('input', { composed: !0, bubbles: !0 }))
  }
  _onChange(t) {
    ;(this.value = t.target.value),
      this.dispatchEvent(new Event('change', { composed: !0, bubbles: !0 }))
  }
  _onInvalid(t) {
    t.preventDefault(), this.input.focus()
  }
  _renderPasswordButton() {
    return l`
    <awc-toolbar-button
      @click="${this._changeVisibilityPassword}"
      class="awc-input__password">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1.88016 4.52534C1.61801 4.03924 1.01143 3.85769 0.525328 4.11984C0.0392261 4.382 -0.142322 4.98858 0.119829 5.47468C0.460909 6.10714 0.886046 6.69103 1.38093 7.21455C1.35044 7.23864 1.32104 7.26476 1.29289 7.2929L0.292888 8.2929C-0.097636 8.68343 -0.097636 9.31659 0.292888 9.70712C0.683413 10.0976 1.31658 10.0976 1.7071 9.70712L2.7071 8.70712C2.77745 8.63677 2.83512 8.55856 2.88012 8.47531C3.49551 8.88444 4.16892 9.22105 4.8856 9.47295L4.51941 11.3039C4.4111 11.8455 4.76232 12.3723 5.30388 12.4806C5.84544 12.5889 6.37226 12.2377 6.48058 11.6961L6.83405 9.92873C7.21597 9.97577 7.6052 10 7.99999 10C8.39479 10 8.78401 9.97577 9.16594 9.92873L9.51941 11.6961C9.62773 12.2377 10.1546 12.5889 10.6961 12.4806C11.2377 12.3723 11.5889 11.8455 11.4806 11.3039L11.1144 9.47295C11.8311 9.22105 12.5045 8.88444 13.1199 8.47531C13.1649 8.55856 13.2225 8.63677 13.2929 8.70712L14.2929 9.70712C14.6834 10.0976 15.3166 10.0976 15.7071 9.70712C16.0976 9.31659 16.0976 8.68343 15.7071 8.2929L14.7071 7.2929C14.679 7.26476 14.6495 7.23864 14.6191 7.21455C15.1139 6.69103 15.5391 6.10714 15.8802 5.47468C16.1423 4.98858 15.9608 4.382 15.4747 4.11984C14.9886 3.85769 14.382 4.03924 14.1198 4.52534C13.0235 6.55825 10.7156 8.00001 7.99999 8.00001C5.2844 8.00001 2.97649 6.55825 1.88016 4.52534Z"
            fill="#919BB6"
          />
        </svg>
      </awc-toolbar-button>
    `
  }
  /**
   * Устанавливает фокус на поле ввода.
   * @method
   */
  focus() {
    this.input.focus()
  }
  /**
   * Убирает фокус с поля ввода.
   * @method
   */
  blur() {
    this.input.blur()
  }
  /**
   * Выделяет текст в поле ввода.
   * @method
   */
  select() {
    this.input.select()
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener('invalid', this._onInvalid)
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener('invalid', this._onInvalid)
  }
  updated(t) {
    super.updated(t),
      t.has('value') && this.setValue(this.value),
      t.has('value') && this.maxlength && this._updateCharacterLimit(),
      (this.type === 'password' || this.maxlength) && this._paddingInputIcon()
  }
  render() {
    const t = {
        'awc-input': !0,
        [this.size]: !0,
        'awc-input--error': this.showError
      },
      e = this.type === 'password' ? this._renderPasswordButton() : '',
      r = this.maxlength && !e ? l`<div class="awc-input__progress"></div>` : ''
    return l`
      <div class="awc-input__main">
          ${this.label ? l`<label for=${this.inputId} class="awc-input__label">${this.label}</label>` : ''}
          <div class="awc-input__wrapper">
            <div class="awc-input__container">
              <input
                class=${et(t)}
                id=${this.inputId}
                type=${this.type}
                .value=${ir(this.value)}
                placeholder=${this.placeholder}
                maxlength="${F(this.maxlength)}"
                minlength="${F(this.minlength)}"
                min="${F(this.min)}"
                max="${F(this.max)}"
                pattern="${F(this.pattern)}"
                step="${F(this.step)}"
                autocomplete="${F(this.autocomplete)}"
                ?autofocus=${this.autofocus}
                ?required=${this.required}
                ?disabled=${this.disabled}
                ?readonly=${this.readonly}
                @change=${this._onChange}
                @input=${this._onInput}
                @keypress=${this._onKeyDown}
              />

              ${e}
              ${r}
            </div>
            <div class="awc-input__slot">
                <slot></slot>
            </div>
          </div>
          
          ${this.showError && this.required && !this.staticError ? l`<span class="awc-input__error">${this.validationMessage}</span>` : this.hint && !this.staticError ? l`<span class="awc-input__hint">${this.hint}</span>` : ''}

          ${this.staticError && this.required && this.customError ? l`<span class="awc-input__error">${this.customError}</span>` : this.hint && this.staticError ? l`<span class="awc-input__hint">${this.hint}</span>` : ''}
      </div>
    `
  }
}
A.formControlValidators = [Dr]
A.shadowRootOptions = { ...u.shadowRootOptions, delegatesFocus: !0 }
A.styles = [on]
D([n({ type: String, reflect: !0 })], A.prototype, 'label', 2)
D([n({ type: String, reflect: !0 })], A.prototype, 'value', 2)
D([n({ type: String, reflect: !0 })], A.prototype, 'placeholder', 2)
D([n({ type: String, reflect: !0 })], A.prototype, 'name', 2)
D([n({ type: String, reflect: !0 })], A.prototype, 'hint', 2)
D([n({ reflect: !0 })], A.prototype, 'type', 2)
D([n({ type: String, reflect: !0 })], A.prototype, 'size', 2)
D([n({ reflect: !0, attribute: 'custom-error' })], A.prototype, 'customError', 2)
D([n({ type: Number, reflect: !0 })], A.prototype, 'maxlength', 2)
D([n({ type: Number, reflect: !0 })], A.prototype, 'minlength', 2)
D([n({ reflect: !0 })], A.prototype, 'min', 2)
D([n({ reflect: !0 })], A.prototype, 'max', 2)
D([n({ type: Number, reflect: !0 })], A.prototype, 'step', 2)
D([n({ type: String, reflect: !0 })], A.prototype, 'pattern', 2)
D([n({ type: String, reflect: !0 })], A.prototype, 'autocomplete', 2)
D([n({ type: Boolean, reflect: !0 })], A.prototype, 'autofocus', 2)
D([n({ type: Boolean, reflect: !0 })], A.prototype, 'required', 2)
D([n({ type: Boolean, reflect: !0 })], A.prototype, 'disabled', 2)
D([n({ type: Boolean, reflect: !0 })], A.prototype, 'readonly', 2)
D([n({ type: Boolean, reflect: !0, attribute: 'static-error' })], A.prototype, 'staticError', 2)
D([Y()], A.prototype, 'validationMessage', 2)
D([S('input')], A.prototype, 'validationTarget', 2)
D([S('.awc-input')], A.prototype, 'input', 2)
D([S('.awc-input__password')], A.prototype, '_passwordButton', 2)
D([S('.awc-input__progress')], A.prototype, '_progressBar', 2)
A = D([f(nn)], A)
const ln = w`
  :host {
    display: block;
  }

  .awc-textarea-container {
    display: flex;
    gap: var(--spacing-s);
    flex-direction: column;
  }

  label {
    font: var(--awc-font-text-medium-14);
    color: var(--colors-light-titles);
  }

  :host([disabled]) .awc-textarea {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .awc-textarea {
    width: 100%;
    font: var(--awc-font-text-regular-15);
    padding: 9.5px 14px;
    outline: none;
    border-radius: var(--corner-radius-m);
    background-color: var(--colors-light-textarea);
    transition:
      background-color 0.2s,
      border-color 0.2s;
    border: 1px solid transparent;
    resize: none;
    overflow: auto;
  }

  .awc-textarea::placeholder {
    color: var(--colors-light-secondary);
  }

  .awc-textarea:hover {
    background-color: var(--colors-light-stroke);
    transition: background-color 0.3s ease;
  }

  .awc-textarea-wrapper {
    display: flex;
    position: relative;
  }

  .awc-textarea:focus {
    outline: none;
    background: var(--colors-light-white);
    border: 1px solid var(--colors-light-focus);
    transition:
      background-color 0.3s ease,
      border 0.3s;
  }

  /* .awc-textarea:focus + .awc-textarea__focus {
    content: "";
    z-index: 1;
    position: absolute;
    inset: -3px;
    border: 3px solid #839ff633;
    pointer-events: none;
    border-radius: var(--corner-radius-l);
  } */

  :host([resize]) .awc-textarea {
    resize: both;
  }
`
var cn = Object.defineProperty,
  dn = Object.getOwnPropertyDescriptor,
  lt = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? dn(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && cn(e, r, o), o
  }
const pn = 'awc-textarea'
let K = class extends kt(u) {
  constructor() {
    super(...arguments),
      (this.value = ''),
      (this.autofocus = !1),
      (this.readonly = !1),
      (this.disabled = !1),
      (this.resize = !1),
      (this.autoheight = !1),
      (this.autocomplete = 'off'),
      (this.rows = 2),
      (this.cols = 20),
      (this.textAreaId = Math.random().toString(36).substring(2))
  }
  _handleInput() {
    this._autoHeightTextArea(this.textarea),
      (this.value = this.textarea.value),
      this._onInput.bind(this)
  }
  resetFormControl() {
    this.value = ''
  }
  _autoHeightTextArea(t) {
    this.autoheight &&
      !this.resize &&
      ((t.style.height = 'auto'), (t.style.height = `${t.scrollHeight}px`))
  }
  _onInput(t) {
    ;(this.value = t.target.value),
      this.dispatchEvent(new InputEvent('input', { composed: !0, bubbles: !0 }))
  }
  _onChange(t) {
    ;(this.value = t.target.value),
      this.dispatchEvent(new Event('change', { composed: !0, bubbles: !0 }))
  }
  updated(t) {
    super.updated(t),
      t.has('value') && (this.setValue(this.value), (this.textarea.value = this.value))
  }
  firstUpdated() {
    ;(this.textarea.value = this.value), this._autoHeightTextArea(this.textarea)
  }
  /**
   * Выделяет текст в поле ввода.
   * @method
   */
  select() {
    this.textarea.select()
  }
  render() {
    return l`
      <div class="awc-textarea-container">
        <label for=${this.textAreaId} name="label">${this.label}</label>
        <div class="awc-textarea-wrapper">
          <textarea
            class="awc-textarea"
            id=${this.textAreaId}
            name=${F(this.name)}
            placeholder=${F(this.placeholder)}
            .value=${ir(this.value)}
            rows=${F(this.rows)}
            cols=${F(this.cols)}
            autocomplete="${F(this.autocomplete)}"
            ?autoheight=${this.autoheight}
            ?resize=${this.resize}
            ?autofocus=${this.autofocus}
            ?readonly=${this.readonly}
            ?disabled=${this.disabled}
            @input=${this._handleInput}
            @change=${this._onChange}
          ></textarea>
          <div class="awc-textarea__focus"></div>
        </div>
      </div>
    `
  }
}
K.shadowRootOptions = { ...u.shadowRootOptions, delegatesFocus: !0 }
K.styles = [ln]
lt([n({ type: String, reflect: !0 })], K.prototype, 'value', 2)
lt([n({ type: String, reflect: !0 })], K.prototype, 'placeholder', 2)
lt([n({ type: String, reflect: !0 })], K.prototype, 'name', 2)
lt([n({ type: String, reflect: !0 })], K.prototype, 'label', 2)
lt([n({ type: Boolean, reflect: !0 })], K.prototype, 'autofocus', 2)
lt([n({ type: Boolean, reflect: !0 })], K.prototype, 'readonly', 2)
lt([n({ type: Boolean, reflect: !0 })], K.prototype, 'disabled', 2)
lt([n({ type: Boolean, reflect: !0 })], K.prototype, 'resize', 2)
lt([n({ type: Boolean, reflect: !0 })], K.prototype, 'autoheight', 2)
lt([n({ type: String, reflect: !0 })], K.prototype, 'autocomplete', 2)
lt([n({ type: Number, reflect: !0 })], K.prototype, 'rows', 2)
lt([n({ type: Number, reflect: !0 })], K.prototype, 'cols', 2)
lt([S('textarea')], K.prototype, 'textarea', 2)
K = lt([f(pn)], K)
const hn = w`
   .awc-steps {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .awc-steps__status {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .awc-steps__sticker {
      font: var(--awc-font-caption-1-regular);
      background-color: var(--colors-light-secondary);
      color: var(--colors-light-white);
      border-radius: var(--corner-radius-l);
      padding: 4px 9px;
    }

    .awc-steps__report {
      color: var(--colors-light-titles);
      font: var(--awc-font-headline-medium-16);
    }

    .awc-steps__progress {
      width: 100%;
      display: flex;
      gap: 4px;
      overflow: hidden;
      overflow-x: auto;
      padding-bottom: 3px;
    }

    .progress-item {
      min-width: 50px;
      width: 100%;
      height: 6px;
      border-radius: var(--corner-radius-s);
      background-color: var(--colors-light-secondary);
      opacity: 0.4;
    }

    .progress-item--current {
      background-color: var(--colors-light-primary);
      opacity: 1;
    }
    .progress-item--past {
      background-color: var(--colors-light-primary);
      opacity: 0.7;
    }

    .progress-item--completed {
      background-color: var(--colors-light-success);
      opacity: 1;
    }

    .progress-item--error {
      background-color: var(--colors-light-warning);
      opacity: 1;
    }
`
var un = Object.defineProperty,
  vn = Object.getOwnPropertyDescriptor,
  Mr = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? vn(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && un(e, r, o), o
  }
let ke = class extends u {
  constructor() {
    super(...arguments), (this.id = 'stepper-1'), (this.report = []), (this.status = 1)
  }
  _calcSteps() {
    const t = this.report.length
    return Array.from({ length: t }, (e, r) => (r + 1).toString())
  }
  _stepUpdater() {
    let t = parseInt(this.status.toString(), 10)
    if (((isNaN(t) || t < 1) && ((t = 1), (this.status = t)), !this.shadowRoot)) return
    const e = this.shadowRoot.querySelectorAll('.progress-item')
    if (t <= this.report.length) {
      e.forEach((i, o) => {
        const s = o + 1,
          a = s < t,
          d = s === t
        i.classList.toggle('progress-item--past', a),
          i.classList.toggle('progress-item--current', d),
          a && i.classList.remove('progress-item--completed')
      })
      const r = t === this.report.length
      e.forEach((i) => {
        i.classList.toggle('progress-item--completed', r)
      }),
        e.forEach((i) => {
          i.classList.remove('progress-item--error')
        })
    } else
      e.forEach((r) => {
        r.classList.add('progress-item--error')
      })
  }
  updated(t) {
    super.updated(t), t.has('status') && this._stepUpdater()
  }
  firstUpdated() {
    this._calcSteps()
  }
  render() {
    return l`
      <div id=${this.id} class="awc-steps">
        <div class="awc-steps__status">
          <div class="awc-steps__sticker">Шаг ${this.status}</div>
          <div class="awc-steps__report">
            ${this.report[(this.status, 10 - 1)]}
          </div>
        </div>
        <div class="awc-steps__progress">${this._renderProgress()}</div>
      </div>
    `
  }
  _renderProgress() {
    const t = this.report.length
    return Array.from({ length: t }, () => l`<div class="progress-item"></div>`)
  }
}
ke.styles = [hn]
Mr([n({ type: String, reflect: !0 })], ke.prototype, 'id', 2)
Mr([n({ type: Array, reflect: !0 })], ke.prototype, 'report', 2)
Mr([n({ type: Number, reflect: !0 })], ke.prototype, 'status', 2)
ke = Mr([f('awc-steps')], ke)
const gn = w`

  :host {
    display: flex;
    fill: var(--colors-light-secondary);
    // fixes incorrect display in firefox (verified by awc-die)
    min-height: 16px;
    min-width: 16px;
  }

  .awc-icon {
    display: flex;
    max-width: max-content;
  }

  :host([icon-scale]) .awc-icon{
    width: var(--awc-icon-size);
    height: var(--awc-icon-size);
  }

  .awc-icon{
    width: var(--awc-icon-size);
    height: var(--awc-icon-size);
  }
`
var fn = Object.defineProperty,
  wn = Object.getOwnPropertyDescriptor,
  jr = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? wn(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && fn(e, r, o), o
  }
let Ze = class extends u {
  constructor() {
    super(...arguments), (this.type = 'icon'), (this.size = ''), (this.src = '')
  }
  _setGlobalIcons() {
    const t = this.type,
      e = this.size,
      r = this.src,
      i = window.__AWC_ICONS || {}
    return (window.__AWC_ICONS = i), i[t] || (i[t] = {}), (i[t][e] = r), i
  }
  firstUpdated() {
    this._setGlobalIcons()
  }
}
jr([n({ type: String })], Ze.prototype, 'type', 2)
jr([n({ type: String })], Ze.prototype, 'size', 2)
jr([n({ type: String })], Ze.prototype, 'src', 2)
Ze = jr([f('awc-icon-loader')], Ze)
var bn = Object.defineProperty,
  _n = Object.getOwnPropertyDescriptor,
  ar = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? _n(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && bn(e, r, o), o
  }
const Mi = 'awc-icon'
let de = class extends u {
  constructor() {
    super(...arguments),
      (this.type = 'icon'),
      (this.size = '16'),
      (this.name = ''),
      (this.iconScale = '')
  }
  _getGlobalIcon() {
    const t = window.__AWC_ICONS
    if (t && t[this.type] && t[this.type][this.size]) return t[this.type][this.size]
  }
  render() {
    const t = this._getGlobalIcon()
    if (t)
      return Q`
        <svg
          class="awc-icon"
          style=${this.iconScale ? `--awc-icon-size: ${this.iconScale}` : ''}
          width=${this.size}
          height=${this.size}
        >
          <use href="${t}#${this.name}"></use>
        </svg>
        <slot></slot>
      `
  }
}
de.styles = [gn]
ar([n({ type: String, reflect: !0 })], de.prototype, 'type', 2)
ar([n({ type: String, reflect: !0 })], de.prototype, 'size', 2)
ar([n({ type: String, reflect: !0 })], de.prototype, 'name', 2)
ar([n({ type: String, attribute: 'icon-scale' })], de.prototype, 'iconScale', 2)
de = ar([f(Mi)], de)
var it = 'top',
  ut = 'bottom',
  vt = 'right',
  st = 'left',
  go = 'auto',
  nr = [it, ut, vt, st],
  Oe = 'start',
  Xe = 'end',
  mn = 'clippingParents',
  ji = 'viewport',
  Me = 'popper',
  yn = 'reference',
  Go = /* @__PURE__ */ nr.reduce(function (t, e) {
    return t.concat([e + '-' + Oe, e + '-' + Xe])
  }, []),
  zi = /* @__PURE__ */ [].concat(nr, [go]).reduce(function (t, e) {
    return t.concat([e, e + '-' + Oe, e + '-' + Xe])
  }, []),
  xn = 'beforeRead',
  Cn = 'read',
  $n = 'afterRead',
  kn = 'beforeMain',
  On = 'main',
  En = 'afterMain',
  Sn = 'beforeWrite',
  Pn = 'write',
  An = 'afterWrite',
  Ln = [xn, Cn, $n, kn, On, En, Sn, Pn, An]
function Et(t) {
  return t ? (t.nodeName || '').toLowerCase() : null
}
function ct(t) {
  if (t == null) return window
  if (t.toString() !== '[object Window]') {
    var e = t.ownerDocument
    return (e && e.defaultView) || window
  }
  return t
}
function pe(t) {
  var e = ct(t).Element
  return t instanceof e || t instanceof Element
}
function ht(t) {
  var e = ct(t).HTMLElement
  return t instanceof e || t instanceof HTMLElement
}
function fo(t) {
  if (typeof ShadowRoot > 'u') return !1
  var e = ct(t).ShadowRoot
  return t instanceof e || t instanceof ShadowRoot
}
function Bn(t) {
  var e = t.state
  Object.keys(e.elements).forEach(function (r) {
    var i = e.styles[r] || {},
      o = e.attributes[r] || {},
      s = e.elements[r]
    !ht(s) ||
      !Et(s) ||
      (Object.assign(s.style, i),
      Object.keys(o).forEach(function (a) {
        var d = o[a]
        d === !1 ? s.removeAttribute(a) : s.setAttribute(a, d === !0 ? '' : d)
      }))
  })
}
function In(t) {
  var e = t.state,
    r = {
      popper: {
        position: e.options.strategy,
        left: '0',
        top: '0',
        margin: '0'
      },
      arrow: {
        position: 'absolute'
      },
      reference: {}
    }
  return (
    Object.assign(e.elements.popper.style, r.popper),
    (e.styles = r),
    e.elements.arrow && Object.assign(e.elements.arrow.style, r.arrow),
    function () {
      Object.keys(e.elements).forEach(function (i) {
        var o = e.elements[i],
          s = e.attributes[i] || {},
          a = Object.keys(e.styles.hasOwnProperty(i) ? e.styles[i] : r[i]),
          d = a.reduce(function (c, h) {
            return (c[h] = ''), c
          }, {})
        !ht(o) ||
          !Et(o) ||
          (Object.assign(o.style, d),
          Object.keys(s).forEach(function (c) {
            o.removeAttribute(c)
          }))
      })
    }
  )
}
const Tn = {
  name: 'applyStyles',
  enabled: !0,
  phase: 'write',
  fn: Bn,
  effect: In,
  requires: ['computeStyles']
}
function Ot(t) {
  return t.split('-')[0]
}
var se = Math.max,
  Er = Math.min,
  Ee = Math.round
function Jr() {
  var t = navigator.userAgentData
  return t != null && t.brands && Array.isArray(t.brands)
    ? t.brands
        .map(function (e) {
          return e.brand + '/' + e.version
        })
        .join(' ')
    : navigator.userAgent
}
function Ri() {
  return !/^((?!chrome|android).)*safari/i.test(Jr())
}
function Se(t, e, r) {
  e === void 0 && (e = !1), r === void 0 && (r = !1)
  var i = t.getBoundingClientRect(),
    o = 1,
    s = 1
  e &&
    ht(t) &&
    ((o = (t.offsetWidth > 0 && Ee(i.width) / t.offsetWidth) || 1),
    (s = (t.offsetHeight > 0 && Ee(i.height) / t.offsetHeight) || 1))
  var a = pe(t) ? ct(t) : window,
    d = a.visualViewport,
    c = !Ri() && r,
    h = (i.left + (c && d ? d.offsetLeft : 0)) / o,
    p = (i.top + (c && d ? d.offsetTop : 0)) / s,
    g = i.width / o,
    y = i.height / s
  return {
    width: g,
    height: y,
    top: p,
    right: h + g,
    bottom: p + y,
    left: h,
    x: h,
    y: p
  }
}
function wo(t) {
  var e = Se(t),
    r = t.offsetWidth,
    i = t.offsetHeight
  return (
    Math.abs(e.width - r) <= 1 && (r = e.width),
    Math.abs(e.height - i) <= 1 && (i = e.height),
    {
      x: t.offsetLeft,
      y: t.offsetTop,
      width: r,
      height: i
    }
  )
}
function Fi(t, e) {
  var r = e.getRootNode && e.getRootNode()
  if (t.contains(e)) return !0
  if (r && fo(r)) {
    var i = e
    do {
      if (i && t.isSameNode(i)) return !0
      i = i.parentNode || i.host
    } while (i)
  }
  return !1
}
function zt(t) {
  return ct(t).getComputedStyle(t)
}
function Dn(t) {
  return ['table', 'td', 'th'].indexOf(Et(t)) >= 0
}
function Kt(t) {
  return (
    (pe(t)
      ? t.ownerDocument
      : // $FlowFixMe[prop-missing]
        t.document) || window.document
  ).documentElement
}
function zr(t) {
  return Et(t) === 'html'
    ? t
    : // this is a quicker (but less type safe) way to save quite some bytes from the bundle
      // $FlowFixMe[incompatible-return]
      // $FlowFixMe[prop-missing]
      t.assignedSlot || // step into the shadow DOM of the parent of a slotted node
        t.parentNode || // DOM Element detected
        (fo(t) ? t.host : null) || // ShadowRoot detected
        // $FlowFixMe[incompatible-call]: HTMLElement is a Node
        Kt(t)
}
function Zo(t) {
  return !ht(t) || // https://github.com/popperjs/popper-core/issues/837
    zt(t).position === 'fixed'
    ? null
    : t.offsetParent
}
function Mn(t) {
  var e = /firefox/i.test(Jr()),
    r = /Trident/i.test(Jr())
  if (r && ht(t)) {
    var i = zt(t)
    if (i.position === 'fixed') return null
  }
  var o = zr(t)
  for (fo(o) && (o = o.host); ht(o) && ['html', 'body'].indexOf(Et(o)) < 0; ) {
    var s = zt(o)
    if (
      s.transform !== 'none' ||
      s.perspective !== 'none' ||
      s.contain === 'paint' ||
      ['transform', 'perspective'].indexOf(s.willChange) !== -1 ||
      (e && s.willChange === 'filter') ||
      (e && s.filter && s.filter !== 'none')
    )
      return o
    o = o.parentNode
  }
  return null
}
function lr(t) {
  for (var e = ct(t), r = Zo(t); r && Dn(r) && zt(r).position === 'static'; ) r = Zo(r)
  return r && (Et(r) === 'html' || (Et(r) === 'body' && zt(r).position === 'static'))
    ? e
    : r || Mn(t) || e
}
function bo(t) {
  return ['top', 'bottom'].indexOf(t) >= 0 ? 'x' : 'y'
}
function Re(t, e, r) {
  return se(t, Er(e, r))
}
function jn(t, e, r) {
  var i = Re(t, e, r)
  return i > r ? r : i
}
function Vi() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
}
function qi(t) {
  return Object.assign({}, Vi(), t)
}
function Hi(t, e) {
  return e.reduce(function (r, i) {
    return (r[i] = t), r
  }, {})
}
var zn = function (e, r) {
  return (
    (e =
      typeof e == 'function'
        ? e(
            Object.assign({}, r.rects, {
              placement: r.placement
            })
          )
        : e),
    qi(typeof e != 'number' ? e : Hi(e, nr))
  )
}
function Rn(t) {
  var e,
    r = t.state,
    i = t.name,
    o = t.options,
    s = r.elements.arrow,
    a = r.modifiersData.popperOffsets,
    d = Ot(r.placement),
    c = bo(d),
    h = [st, vt].indexOf(d) >= 0,
    p = h ? 'height' : 'width'
  if (!(!s || !a)) {
    var g = zn(o.padding, r),
      y = wo(s),
      _ = c === 'y' ? it : st,
      O = c === 'y' ? ut : vt,
      C = r.rects.reference[p] + r.rects.reference[c] - a[c] - r.rects.popper[p],
      $ = a[c] - r.rects.reference[c],
      L = lr(s),
      M = L ? (c === 'y' ? L.clientHeight || 0 : L.clientWidth || 0) : 0,
      z = C / 2 - $ / 2,
      x = g[_],
      v = M - y[p] - g[O],
      b = M / 2 - y[p] / 2 + z,
      m = Re(x, b, v),
      k = c
    r.modifiersData[i] = ((e = {}), (e[k] = m), (e.centerOffset = m - b), e)
  }
}
function Fn(t) {
  var e = t.state,
    r = t.options,
    i = r.element,
    o = i === void 0 ? '[data-popper-arrow]' : i
  o != null &&
    ((typeof o == 'string' && ((o = e.elements.popper.querySelector(o)), !o)) ||
      (Fi(e.elements.popper, o) && (e.elements.arrow = o)))
}
const Vn = {
  name: 'arrow',
  enabled: !0,
  phase: 'main',
  fn: Rn,
  effect: Fn,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
}
function Pe(t) {
  return t.split('-')[1]
}
var qn = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}
function Hn(t, e) {
  var r = t.x,
    i = t.y,
    o = e.devicePixelRatio || 1
  return {
    x: Ee(r * o) / o || 0,
    y: Ee(i * o) / o || 0
  }
}
function Xo(t) {
  var e,
    r = t.popper,
    i = t.popperRect,
    o = t.placement,
    s = t.variation,
    a = t.offsets,
    d = t.position,
    c = t.gpuAcceleration,
    h = t.adaptive,
    p = t.roundOffsets,
    g = t.isFixed,
    y = a.x,
    _ = y === void 0 ? 0 : y,
    O = a.y,
    C = O === void 0 ? 0 : O,
    $ =
      typeof p == 'function'
        ? p({
            x: _,
            y: C
          })
        : {
            x: _,
            y: C
          }
  ;(_ = $.x), (C = $.y)
  var L = a.hasOwnProperty('x'),
    M = a.hasOwnProperty('y'),
    z = st,
    x = it,
    v = window
  if (h) {
    var b = lr(r),
      m = 'clientHeight',
      k = 'clientWidth'
    if (
      (b === ct(r) &&
        ((b = Kt(r)),
        zt(b).position !== 'static' &&
          d === 'absolute' &&
          ((m = 'scrollHeight'), (k = 'scrollWidth'))),
      (b = b),
      o === it || ((o === st || o === vt) && s === Xe))
    ) {
      x = ut
      var T =
        g && b === v && v.visualViewport
          ? v.visualViewport.height
          : // $FlowFixMe[prop-missing]
            b[m]
      ;(C -= T - i.height), (C *= c ? 1 : -1)
    }
    if (o === st || ((o === it || o === ut) && s === Xe)) {
      z = vt
      var j =
        g && b === v && v.visualViewport
          ? v.visualViewport.width
          : // $FlowFixMe[prop-missing]
            b[k]
      ;(_ -= j - i.width), (_ *= c ? 1 : -1)
    }
  }
  var R = Object.assign(
      {
        position: d
      },
      h && qn
    ),
    Z =
      p === !0
        ? Hn(
            {
              x: _,
              y: C
            },
            ct(r)
          )
        : {
            x: _,
            y: C
          }
  if (((_ = Z.x), (C = Z.y), c)) {
    var G
    return Object.assign(
      {},
      R,
      ((G = {}),
      (G[x] = M ? '0' : ''),
      (G[z] = L ? '0' : ''),
      (G.transform =
        (v.devicePixelRatio || 1) <= 1
          ? 'translate(' + _ + 'px, ' + C + 'px)'
          : 'translate3d(' + _ + 'px, ' + C + 'px, 0)'),
      G)
    )
  }
  return Object.assign(
    {},
    R,
    ((e = {}), (e[x] = M ? C + 'px' : ''), (e[z] = L ? _ + 'px' : ''), (e.transform = ''), e)
  )
}
function Un(t) {
  var e = t.state,
    r = t.options,
    i = r.gpuAcceleration,
    o = i === void 0 ? !0 : i,
    s = r.adaptive,
    a = s === void 0 ? !0 : s,
    d = r.roundOffsets,
    c = d === void 0 ? !0 : d,
    h = {
      placement: Ot(e.placement),
      variation: Pe(e.placement),
      popper: e.elements.popper,
      popperRect: e.rects.popper,
      gpuAcceleration: o,
      isFixed: e.options.strategy === 'fixed'
    }
  e.modifiersData.popperOffsets != null &&
    (e.styles.popper = Object.assign(
      {},
      e.styles.popper,
      Xo(
        Object.assign({}, h, {
          offsets: e.modifiersData.popperOffsets,
          position: e.options.strategy,
          adaptive: a,
          roundOffsets: c
        })
      )
    )),
    e.modifiersData.arrow != null &&
      (e.styles.arrow = Object.assign(
        {},
        e.styles.arrow,
        Xo(
          Object.assign({}, h, {
            offsets: e.modifiersData.arrow,
            position: 'absolute',
            adaptive: !1,
            roundOffsets: c
          })
        )
      )),
    (e.attributes.popper = Object.assign({}, e.attributes.popper, {
      'data-popper-placement': e.placement
    }))
}
const Nn = {
  name: 'computeStyles',
  enabled: !0,
  phase: 'beforeWrite',
  fn: Un,
  data: {}
}
var wr = {
  passive: !0
}
function Wn(t) {
  var e = t.state,
    r = t.instance,
    i = t.options,
    o = i.scroll,
    s = o === void 0 ? !0 : o,
    a = i.resize,
    d = a === void 0 ? !0 : a,
    c = ct(e.elements.popper),
    h = [].concat(e.scrollParents.reference, e.scrollParents.popper)
  return (
    s &&
      h.forEach(function (p) {
        p.addEventListener('scroll', r.update, wr)
      }),
    d && c.addEventListener('resize', r.update, wr),
    function () {
      s &&
        h.forEach(function (p) {
          p.removeEventListener('scroll', r.update, wr)
        }),
        d && c.removeEventListener('resize', r.update, wr)
    }
  )
}
const Gn = {
  name: 'eventListeners',
  enabled: !0,
  phase: 'write',
  fn: function () {},
  effect: Wn,
  data: {}
}
var Zn = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
}
function _r(t) {
  return t.replace(/left|right|bottom|top/g, function (e) {
    return Zn[e]
  })
}
var Xn = {
  start: 'end',
  end: 'start'
}
function Ko(t) {
  return t.replace(/start|end/g, function (e) {
    return Xn[e]
  })
}
function _o(t) {
  var e = ct(t),
    r = e.pageXOffset,
    i = e.pageYOffset
  return {
    scrollLeft: r,
    scrollTop: i
  }
}
function mo(t) {
  return Se(Kt(t)).left + _o(t).scrollLeft
}
function Kn(t, e) {
  var r = ct(t),
    i = Kt(t),
    o = r.visualViewport,
    s = i.clientWidth,
    a = i.clientHeight,
    d = 0,
    c = 0
  if (o) {
    ;(s = o.width), (a = o.height)
    var h = Ri()
    ;(h || (!h && e === 'fixed')) && ((d = o.offsetLeft), (c = o.offsetTop))
  }
  return {
    width: s,
    height: a,
    x: d + mo(t),
    y: c
  }
}
function Yn(t) {
  var e,
    r = Kt(t),
    i = _o(t),
    o = (e = t.ownerDocument) == null ? void 0 : e.body,
    s = se(r.scrollWidth, r.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0),
    a = se(r.scrollHeight, r.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0),
    d = -i.scrollLeft + mo(t),
    c = -i.scrollTop
  return (
    zt(o || r).direction === 'rtl' && (d += se(r.clientWidth, o ? o.clientWidth : 0) - s),
    {
      width: s,
      height: a,
      x: d,
      y: c
    }
  )
}
function yo(t) {
  var e = zt(t),
    r = e.overflow,
    i = e.overflowX,
    o = e.overflowY
  return /auto|scroll|overlay|hidden/.test(r + o + i)
}
function Ui(t) {
  return ['html', 'body', '#document'].indexOf(Et(t)) >= 0
    ? t.ownerDocument.body
    : ht(t) && yo(t)
      ? t
      : Ui(zr(t))
}
function Fe(t, e) {
  var r
  e === void 0 && (e = [])
  var i = Ui(t),
    o = i === ((r = t.ownerDocument) == null ? void 0 : r.body),
    s = ct(i),
    a = o ? [s].concat(s.visualViewport || [], yo(i) ? i : []) : i,
    d = e.concat(a)
  return o
    ? d
    : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
      d.concat(Fe(zr(a)))
}
function Qr(t) {
  return Object.assign({}, t, {
    left: t.x,
    top: t.y,
    right: t.x + t.width,
    bottom: t.y + t.height
  })
}
function Jn(t, e) {
  var r = Se(t, !1, e === 'fixed')
  return (
    (r.top = r.top + t.clientTop),
    (r.left = r.left + t.clientLeft),
    (r.bottom = r.top + t.clientHeight),
    (r.right = r.left + t.clientWidth),
    (r.width = t.clientWidth),
    (r.height = t.clientHeight),
    (r.x = r.left),
    (r.y = r.top),
    r
  )
}
function Yo(t, e, r) {
  return e === ji ? Qr(Kn(t, r)) : pe(e) ? Jn(e, r) : Qr(Yn(Kt(t)))
}
function Qn(t) {
  var e = Fe(zr(t)),
    r = ['absolute', 'fixed'].indexOf(zt(t).position) >= 0,
    i = r && ht(t) ? lr(t) : t
  return pe(i)
    ? e.filter(function (o) {
        return pe(o) && Fi(o, i) && Et(o) !== 'body'
      })
    : []
}
function tl(t, e, r, i) {
  var o = e === 'clippingParents' ? Qn(t) : [].concat(e),
    s = [].concat(o, [r]),
    a = s[0],
    d = s.reduce(
      function (c, h) {
        var p = Yo(t, h, i)
        return (
          (c.top = se(p.top, c.top)),
          (c.right = Er(p.right, c.right)),
          (c.bottom = Er(p.bottom, c.bottom)),
          (c.left = se(p.left, c.left)),
          c
        )
      },
      Yo(t, a, i)
    )
  return (
    (d.width = d.right - d.left), (d.height = d.bottom - d.top), (d.x = d.left), (d.y = d.top), d
  )
}
function Ni(t) {
  var e = t.reference,
    r = t.element,
    i = t.placement,
    o = i ? Ot(i) : null,
    s = i ? Pe(i) : null,
    a = e.x + e.width / 2 - r.width / 2,
    d = e.y + e.height / 2 - r.height / 2,
    c
  switch (o) {
    case it:
      c = {
        x: a,
        y: e.y - r.height
      }
      break
    case ut:
      c = {
        x: a,
        y: e.y + e.height
      }
      break
    case vt:
      c = {
        x: e.x + e.width,
        y: d
      }
      break
    case st:
      c = {
        x: e.x - r.width,
        y: d
      }
      break
    default:
      c = {
        x: e.x,
        y: e.y
      }
  }
  var h = o ? bo(o) : null
  if (h != null) {
    var p = h === 'y' ? 'height' : 'width'
    switch (s) {
      case Oe:
        c[h] = c[h] - (e[p] / 2 - r[p] / 2)
        break
      case Xe:
        c[h] = c[h] + (e[p] / 2 - r[p] / 2)
        break
    }
  }
  return c
}
function Ke(t, e) {
  e === void 0 && (e = {})
  var r = e,
    i = r.placement,
    o = i === void 0 ? t.placement : i,
    s = r.strategy,
    a = s === void 0 ? t.strategy : s,
    d = r.boundary,
    c = d === void 0 ? mn : d,
    h = r.rootBoundary,
    p = h === void 0 ? ji : h,
    g = r.elementContext,
    y = g === void 0 ? Me : g,
    _ = r.altBoundary,
    O = _ === void 0 ? !1 : _,
    C = r.padding,
    $ = C === void 0 ? 0 : C,
    L = qi(typeof $ != 'number' ? $ : Hi($, nr)),
    M = y === Me ? yn : Me,
    z = t.rects.popper,
    x = t.elements[O ? M : y],
    v = tl(pe(x) ? x : x.contextElement || Kt(t.elements.popper), c, p, a),
    b = Se(t.elements.reference),
    m = Ni({
      reference: b,
      element: z,
      strategy: 'absolute',
      placement: o
    }),
    k = Qr(Object.assign({}, z, m)),
    T = y === Me ? k : b,
    j = {
      top: v.top - T.top + L.top,
      bottom: T.bottom - v.bottom + L.bottom,
      left: v.left - T.left + L.left,
      right: T.right - v.right + L.right
    },
    R = t.modifiersData.offset
  if (y === Me && R) {
    var Z = R[o]
    Object.keys(j).forEach(function (G) {
      var H = [vt, ut].indexOf(G) >= 0 ? 1 : -1,
        xt = [it, ut].indexOf(G) >= 0 ? 'y' : 'x'
      j[G] += Z[xt] * H
    })
  }
  return j
}
function el(t, e) {
  e === void 0 && (e = {})
  var r = e,
    i = r.placement,
    o = r.boundary,
    s = r.rootBoundary,
    a = r.padding,
    d = r.flipVariations,
    c = r.allowedAutoPlacements,
    h = c === void 0 ? zi : c,
    p = Pe(i),
    g = p
      ? d
        ? Go
        : Go.filter(function (O) {
            return Pe(O) === p
          })
      : nr,
    y = g.filter(function (O) {
      return h.indexOf(O) >= 0
    })
  y.length === 0 && (y = g)
  var _ = y.reduce(function (O, C) {
    return (
      (O[C] = Ke(t, {
        placement: C,
        boundary: o,
        rootBoundary: s,
        padding: a
      })[Ot(C)]),
      O
    )
  }, {})
  return Object.keys(_).sort(function (O, C) {
    return _[O] - _[C]
  })
}
function rl(t) {
  if (Ot(t) === go) return []
  var e = _r(t)
  return [Ko(t), e, Ko(e)]
}
function ol(t) {
  var e = t.state,
    r = t.options,
    i = t.name
  if (!e.modifiersData[i]._skip) {
    for (
      var o = r.mainAxis,
        s = o === void 0 ? !0 : o,
        a = r.altAxis,
        d = a === void 0 ? !0 : a,
        c = r.fallbackPlacements,
        h = r.padding,
        p = r.boundary,
        g = r.rootBoundary,
        y = r.altBoundary,
        _ = r.flipVariations,
        O = _ === void 0 ? !0 : _,
        C = r.allowedAutoPlacements,
        $ = e.options.placement,
        L = Ot($),
        M = L === $,
        z = c || (M || !O ? [_r($)] : rl($)),
        x = [$].concat(z).reduce(function (_e, Ut) {
          return _e.concat(
            Ot(Ut) === go
              ? el(e, {
                  placement: Ut,
                  boundary: p,
                  rootBoundary: g,
                  padding: h,
                  flipVariations: O,
                  allowedAutoPlacements: C
                })
              : Ut
          )
        }, []),
        v = e.rects.reference,
        b = e.rects.popper,
        m = /* @__PURE__ */ new Map(),
        k = !0,
        T = x[0],
        j = 0;
      j < x.length;
      j++
    ) {
      var R = x[j],
        Z = Ot(R),
        G = Pe(R) === Oe,
        H = [it, ut].indexOf(Z) >= 0,
        xt = H ? 'width' : 'height',
        U = Ke(e, {
          placement: R,
          boundary: p,
          rootBoundary: g,
          altBoundary: y,
          padding: h
        }),
        dt = H ? (G ? vt : st) : G ? ut : it
      v[xt] > b[xt] && (dt = _r(dt))
      var Ht = _r(dt),
        te = []
      if (
        (s && te.push(U[Z] <= 0),
        d && te.push(U[dt] <= 0, U[Ht] <= 0),
        te.every(function (_e) {
          return _e
        }))
      ) {
        ;(T = R), (k = !1)
        break
      }
      m.set(R, te)
    }
    if (k)
      for (
        var ur = O ? 3 : 1,
          Fr = function (Ut) {
            var Te = x.find(function (gr) {
              var ee = m.get(gr)
              if (ee)
                return ee.slice(0, Ut).every(function (Vr) {
                  return Vr
                })
            })
            if (Te) return (T = Te), 'break'
          },
          Ie = ur;
        Ie > 0;
        Ie--
      ) {
        var vr = Fr(Ie)
        if (vr === 'break') break
      }
    e.placement !== T && ((e.modifiersData[i]._skip = !0), (e.placement = T), (e.reset = !0))
  }
}
const il = {
  name: 'flip',
  enabled: !0,
  phase: 'main',
  fn: ol,
  requiresIfExists: ['offset'],
  data: {
    _skip: !1
  }
}
function Jo(t, e, r) {
  return (
    r === void 0 &&
      (r = {
        x: 0,
        y: 0
      }),
    {
      top: t.top - e.height - r.y,
      right: t.right - e.width + r.x,
      bottom: t.bottom - e.height + r.y,
      left: t.left - e.width - r.x
    }
  )
}
function Qo(t) {
  return [it, vt, ut, st].some(function (e) {
    return t[e] >= 0
  })
}
function sl(t) {
  var e = t.state,
    r = t.name,
    i = e.rects.reference,
    o = e.rects.popper,
    s = e.modifiersData.preventOverflow,
    a = Ke(e, {
      elementContext: 'reference'
    }),
    d = Ke(e, {
      altBoundary: !0
    }),
    c = Jo(a, i),
    h = Jo(d, o, s),
    p = Qo(c),
    g = Qo(h)
  ;(e.modifiersData[r] = {
    referenceClippingOffsets: c,
    popperEscapeOffsets: h,
    isReferenceHidden: p,
    hasPopperEscaped: g
  }),
    (e.attributes.popper = Object.assign({}, e.attributes.popper, {
      'data-popper-reference-hidden': p,
      'data-popper-escaped': g
    }))
}
const al = {
  name: 'hide',
  enabled: !0,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: sl
}
function nl(t, e, r) {
  var i = Ot(t),
    o = [st, it].indexOf(i) >= 0 ? -1 : 1,
    s =
      typeof r == 'function'
        ? r(
            Object.assign({}, e, {
              placement: t
            })
          )
        : r,
    a = s[0],
    d = s[1]
  return (
    (a = a || 0),
    (d = (d || 0) * o),
    [st, vt].indexOf(i) >= 0
      ? {
          x: d,
          y: a
        }
      : {
          x: a,
          y: d
        }
  )
}
function ll(t) {
  var e = t.state,
    r = t.options,
    i = t.name,
    o = r.offset,
    s = o === void 0 ? [0, 0] : o,
    a = zi.reduce(function (p, g) {
      return (p[g] = nl(g, e.rects, s)), p
    }, {}),
    d = a[e.placement],
    c = d.x,
    h = d.y
  e.modifiersData.popperOffsets != null &&
    ((e.modifiersData.popperOffsets.x += c), (e.modifiersData.popperOffsets.y += h)),
    (e.modifiersData[i] = a)
}
const cl = {
  name: 'offset',
  enabled: !0,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: ll
}
function dl(t) {
  var e = t.state,
    r = t.name
  e.modifiersData[r] = Ni({
    reference: e.rects.reference,
    element: e.rects.popper,
    strategy: 'absolute',
    placement: e.placement
  })
}
const pl = {
  name: 'popperOffsets',
  enabled: !0,
  phase: 'read',
  fn: dl,
  data: {}
}
function hl(t) {
  return t === 'x' ? 'y' : 'x'
}
function ul(t) {
  var e = t.state,
    r = t.options,
    i = t.name,
    o = r.mainAxis,
    s = o === void 0 ? !0 : o,
    a = r.altAxis,
    d = a === void 0 ? !1 : a,
    c = r.boundary,
    h = r.rootBoundary,
    p = r.altBoundary,
    g = r.padding,
    y = r.tether,
    _ = y === void 0 ? !0 : y,
    O = r.tetherOffset,
    C = O === void 0 ? 0 : O,
    $ = Ke(e, {
      boundary: c,
      rootBoundary: h,
      padding: g,
      altBoundary: p
    }),
    L = Ot(e.placement),
    M = Pe(e.placement),
    z = !M,
    x = bo(L),
    v = hl(x),
    b = e.modifiersData.popperOffsets,
    m = e.rects.reference,
    k = e.rects.popper,
    T =
      typeof C == 'function'
        ? C(
            Object.assign({}, e.rects, {
              placement: e.placement
            })
          )
        : C,
    j =
      typeof T == 'number'
        ? {
            mainAxis: T,
            altAxis: T
          }
        : Object.assign(
            {
              mainAxis: 0,
              altAxis: 0
            },
            T
          ),
    R = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null,
    Z = {
      x: 0,
      y: 0
    }
  if (b) {
    if (s) {
      var G,
        H = x === 'y' ? it : st,
        xt = x === 'y' ? ut : vt,
        U = x === 'y' ? 'height' : 'width',
        dt = b[x],
        Ht = dt + $[H],
        te = dt - $[xt],
        ur = _ ? -k[U] / 2 : 0,
        Fr = M === Oe ? m[U] : k[U],
        Ie = M === Oe ? -k[U] : -m[U],
        vr = e.elements.arrow,
        _e =
          _ && vr
            ? wo(vr)
            : {
                width: 0,
                height: 0
              },
        Ut = e.modifiersData['arrow#persistent']
          ? e.modifiersData['arrow#persistent'].padding
          : Vi(),
        Te = Ut[H],
        gr = Ut[xt],
        ee = Re(0, m[U], _e[U]),
        Vr = z ? m[U] / 2 - ur - ee - Te - j.mainAxis : Fr - ee - Te - j.mainAxis,
        es = z ? -m[U] / 2 + ur + ee + gr + j.mainAxis : Ie + ee + gr + j.mainAxis,
        qr = e.elements.arrow && lr(e.elements.arrow),
        rs = qr ? (x === 'y' ? qr.clientTop || 0 : qr.clientLeft || 0) : 0,
        Eo = (G = R == null ? void 0 : R[x]) != null ? G : 0,
        os = dt + Vr - Eo - rs,
        is = dt + es - Eo,
        So = Re(_ ? Er(Ht, os) : Ht, dt, _ ? se(te, is) : te)
      ;(b[x] = So), (Z[x] = So - dt)
    }
    if (d) {
      var Po,
        ss = x === 'x' ? it : st,
        as = x === 'x' ? ut : vt,
        re = b[v],
        fr = v === 'y' ? 'height' : 'width',
        Ao = re + $[ss],
        Lo = re - $[as],
        Hr = [it, st].indexOf(L) !== -1,
        Bo = (Po = R == null ? void 0 : R[v]) != null ? Po : 0,
        Io = Hr ? Ao : re - m[fr] - k[fr] - Bo + j.altAxis,
        To = Hr ? re + m[fr] + k[fr] - Bo - j.altAxis : Lo,
        Do = _ && Hr ? jn(Io, re, To) : Re(_ ? Io : Ao, re, _ ? To : Lo)
      ;(b[v] = Do), (Z[v] = Do - re)
    }
    e.modifiersData[i] = Z
  }
}
const vl = {
  name: 'preventOverflow',
  enabled: !0,
  phase: 'main',
  fn: ul,
  requiresIfExists: ['offset']
}
function gl(t) {
  return {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  }
}
function fl(t) {
  return t === ct(t) || !ht(t) ? _o(t) : gl(t)
}
function wl(t) {
  var e = t.getBoundingClientRect(),
    r = Ee(e.width) / t.offsetWidth || 1,
    i = Ee(e.height) / t.offsetHeight || 1
  return r !== 1 || i !== 1
}
function bl(t, e, r) {
  r === void 0 && (r = !1)
  var i = ht(e),
    o = ht(e) && wl(e),
    s = Kt(e),
    a = Se(t, o, r),
    d = {
      scrollLeft: 0,
      scrollTop: 0
    },
    c = {
      x: 0,
      y: 0
    }
  return (
    (i || (!i && !r)) &&
      ((Et(e) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
        yo(s)) &&
        (d = fl(e)),
      ht(e) ? ((c = Se(e, !0)), (c.x += e.clientLeft), (c.y += e.clientTop)) : s && (c.x = mo(s))),
    {
      x: a.left + d.scrollLeft - c.x,
      y: a.top + d.scrollTop - c.y,
      width: a.width,
      height: a.height
    }
  )
}
function _l(t) {
  var e = /* @__PURE__ */ new Map(),
    r = /* @__PURE__ */ new Set(),
    i = []
  t.forEach(function (s) {
    e.set(s.name, s)
  })
  function o(s) {
    r.add(s.name)
    var a = [].concat(s.requires || [], s.requiresIfExists || [])
    a.forEach(function (d) {
      if (!r.has(d)) {
        var c = e.get(d)
        c && o(c)
      }
    }),
      i.push(s)
  }
  return (
    t.forEach(function (s) {
      r.has(s.name) || o(s)
    }),
    i
  )
}
function ml(t) {
  var e = _l(t)
  return Ln.reduce(function (r, i) {
    return r.concat(
      e.filter(function (o) {
        return o.phase === i
      })
    )
  }, [])
}
function yl(t) {
  var e
  return function () {
    return (
      e ||
        (e = new Promise(function (r) {
          Promise.resolve().then(function () {
            ;(e = void 0), r(t())
          })
        })),
      e
    )
  }
}
function xl(t) {
  var e = t.reduce(function (r, i) {
    var o = r[i.name]
    return (
      (r[i.name] = o
        ? Object.assign({}, o, i, {
            options: Object.assign({}, o.options, i.options),
            data: Object.assign({}, o.data, i.data)
          })
        : i),
      r
    )
  }, {})
  return Object.keys(e).map(function (r) {
    return e[r]
  })
}
var ti = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
}
function ei() {
  for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++) e[r] = arguments[r]
  return !e.some(function (i) {
    return !(i && typeof i.getBoundingClientRect == 'function')
  })
}
function Cl(t) {
  t === void 0 && (t = {})
  var e = t,
    r = e.defaultModifiers,
    i = r === void 0 ? [] : r,
    o = e.defaultOptions,
    s = o === void 0 ? ti : o
  return function (d, c, h) {
    h === void 0 && (h = s)
    var p = {
        placement: 'bottom',
        orderedModifiers: [],
        options: Object.assign({}, ti, s),
        modifiersData: {},
        elements: {
          reference: d,
          popper: c
        },
        attributes: {},
        styles: {}
      },
      g = [],
      y = !1,
      _ = {
        state: p,
        setOptions: function (L) {
          var M = typeof L == 'function' ? L(p.options) : L
          C(),
            (p.options = Object.assign({}, s, p.options, M)),
            (p.scrollParents = {
              reference: pe(d) ? Fe(d) : d.contextElement ? Fe(d.contextElement) : [],
              popper: Fe(c)
            })
          var z = ml(xl([].concat(i, p.options.modifiers)))
          return (
            (p.orderedModifiers = z.filter(function (x) {
              return x.enabled
            })),
            O(),
            _.update()
          )
        },
        // Sync update – it will always be executed, even if not necessary. This
        // is useful for low frequency updates where sync behavior simplifies the
        // logic.
        // For high frequency updates (e.g. `resize` and `scroll` events), always
        // prefer the async Popper#update method
        forceUpdate: function () {
          if (!y) {
            var L = p.elements,
              M = L.reference,
              z = L.popper
            if (ei(M, z)) {
              ;(p.rects = {
                reference: bl(M, lr(z), p.options.strategy === 'fixed'),
                popper: wo(z)
              }),
                (p.reset = !1),
                (p.placement = p.options.placement),
                p.orderedModifiers.forEach(function (j) {
                  return (p.modifiersData[j.name] = Object.assign({}, j.data))
                })
              for (var x = 0; x < p.orderedModifiers.length; x++) {
                if (p.reset === !0) {
                  ;(p.reset = !1), (x = -1)
                  continue
                }
                var v = p.orderedModifiers[x],
                  b = v.fn,
                  m = v.options,
                  k = m === void 0 ? {} : m,
                  T = v.name
                typeof b == 'function' &&
                  (p =
                    b({
                      state: p,
                      options: k,
                      name: T,
                      instance: _
                    }) || p)
              }
            }
          }
        },
        // Async and optimistically optimized update – it will not be executed if
        // not necessary (debounced to run at most once-per-tick)
        update: yl(function () {
          return new Promise(function ($) {
            _.forceUpdate(), $(p)
          })
        }),
        destroy: function () {
          C(), (y = !0)
        }
      }
    if (!ei(d, c)) return _
    _.setOptions(h).then(function ($) {
      !y && h.onFirstUpdate && h.onFirstUpdate($)
    })
    function O() {
      p.orderedModifiers.forEach(function ($) {
        var L = $.name,
          M = $.options,
          z = M === void 0 ? {} : M,
          x = $.effect
        if (typeof x == 'function') {
          var v = x({
              state: p,
              name: L,
              instance: _,
              options: z
            }),
            b = function () {}
          g.push(v || b)
        }
      })
    }
    function C() {
      g.forEach(function ($) {
        return $()
      }),
        (g = [])
    }
    return _
  }
}
var $l = [Gn, pl, Nn, Tn, cl, il, vl, Vn, al],
  xo = /* @__PURE__ */ Cl({
    defaultModifiers: $l
  })
const kl = w`
  :host {
    display: var(--awc-tooltip-display, inline-flex);
  }

  .awc-tooltip {
    pointer-events: none;
    position: absolute;
    z-index: 99999;
    left: -9999px;
    max-width: 240px;
    display: block;
    background-color: var(--colors-light-tooltip);
    border-radius: var(--corner-radius-s);
    opacity: 0;
  }

  .awc-tooltip.visible {
    transition: opacity 0.3s ease;
    opacity: 1;
  }

  .awc-tooltip__nested {
    display: var(--awc-tooltip-display, inline-flex);
  }

  .awc-tooltip__nested:focus,
  .awc-tooltip__nested:focus-visible{
    outline: 2px solid blue;
  }

  .awc-tooltip__message {
    font: var(--awc-font-caption-2-regular);
    color: var(--colors-light-white);
    padding: 6px 10px;
    white-space: pre-wrap;
    text-align: center;
    cursor: default;
    margin: 0;
  }

  .awc-tooltip.visible {
    display: block;
  }

  .awc-tooltip__arrow,
  .awc-tooltip__arrow::before {
    position: absolute;
    width: 8px;
    height: 8px;
    background: inherit;
  }

  .awc-tooltip__arrow {
    visibility: hidden;
  }

  .awc-tooltip__arrow::before {
    visibility: visible;
    content: "";
    transform: rotate(45deg);
  }

  .awc-tooltip[data-popper-placement^="top"] > .awc-tooltip__arrow {
    bottom: -4px;
  }

  .awc-tooltip[data-popper-placement^="bottom"] > .awc-tooltip__arrow {
    top: -4px;
  }

  .awc-tooltip[data-popper-placement^="left"] > .awc-tooltip__arrow {
    right: -4px;
  }

  .awc-tooltip[data-popper-placement^="right"] > .awc-tooltip__arrow {
    left: -4px;
  }
`
var Ol = Object.defineProperty,
  El = Object.getOwnPropertyDescriptor,
  Lt = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? El(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && Ol(e, r, o), o
  }
const Sl = {
  XXS: '2',
  XS: '4',
  S: '8',
  SM: '12',
  M: '16',
  L: '20',
  XL: '24',
  XXL: '32',
  XXXL: '40'
}
let gt = class extends u {
  constructor() {
    super(...arguments),
      (this.marker = !0),
      (this.message = 'Tooltip'),
      (this.position = 'top'),
      (this.spacing = 'S'),
      (this.strategy = 'absolute'),
      (this.active = !1),
      (this.disabled = !1),
      (this.popperInstance = null),
      (this.tooltipTimeout = null)
  }
  createPopperInstance() {
    !this._nestedElement ||
      !this.shadowRoot ||
      (this.popperInstance = xo(this._nestedElement, this._tooltip, {
        placement: this.position,
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, Sl[this.spacing]]
            }
          }
        ],
        strategy: this.strategy
      }))
  }
  destroyPopperInstance() {
    this.popperInstance && (this.popperInstance.destroy(), (this.popperInstance = null))
  }
  updated(t) {
    super.updated(t),
      (t.has('active') || t.has('position') || t.has('marker')) &&
        (this.active ? this.createPopperInstance() : this.destroyPopperInstance()),
      t.has('disabled') && this.disabled
        ? (this.removeEventListener('focusin', this.onFocusIn),
          this.removeEventListener('focusout', this.onFocusOut))
        : (this.addEventListener('focusin', this.onFocusIn),
          this.addEventListener('focusout', this.onFocusOut))
  }
  _setupTimout() {
    this.disabled || (this.tooltipTimeout = setTimeout(() => (this.active = !0), 500))
  }
  _disconnectTimeout() {
    this.disabled || (clearTimeout(this.tooltipTimeout), (this.active = !1))
  }
  onFocusIn() {
    this.active = !0
  }
  onFocusOut() {
    this.contains(document.activeElement) || (this.active = !1)
  }
  render() {
    return l`
      <div
        class="awc-tooltip__nested"
        @mouseenter=${this._setupTimout}
        @mouseleave=${this._disconnectTimeout}
      >
        <slot></slot>
      </div>
  
      <div class="awc-tooltip ${this.active ? 'visible' : ''}" role="tooltip">
        <p class="awc-tooltip__message">${this.message}</p>
        ${this.marker ? l`<div class="awc-tooltip__arrow" data-popper-arrow></div>` : ''}
      </div>
    `
  }
}
gt.styles = [kl]
Lt([n({ type: Boolean, reflect: !0 })], gt.prototype, 'marker', 2)
Lt([n({ type: String, reflect: !0 })], gt.prototype, 'message', 2)
Lt([n({ reflect: !0 })], gt.prototype, 'position', 2)
Lt([n({ type: String, reflect: !0 })], gt.prototype, 'spacing', 2)
Lt([n({ type: String, reflect: !0 })], gt.prototype, 'strategy', 2)
Lt([n({ type: Boolean, reflect: !0 })], gt.prototype, 'active', 2)
Lt([n({ type: Boolean, reflect: !0 })], gt.prototype, 'disabled', 2)
Lt([S('.awc-tooltip')], gt.prototype, '_tooltip', 2)
Lt([S('.awc-tooltip__nested')], gt.prototype, '_nestedElement', 2)
gt = Lt([f('awc-tooltip')], gt)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let to = class extends po {
  constructor(e) {
    if ((super(e), (this.it = V), e.type !== Nt.CHILD))
      throw Error(this.constructor.directiveName + '() can only be used in child bindings')
  }
  render(e) {
    if (e === V || e == null) return (this._t = void 0), (this.it = e)
    if (e === pt) return e
    if (typeof e != 'string')
      throw Error(this.constructor.directiveName + '() called with a non-string value')
    if (e === this.it) return this._t
    this.it = e
    const r = [e]
    return (
      (r.raw = r), (this._t = { _$litType$: this.constructor.resultType, strings: r, values: [] })
    )
  }
}
;(to.directiveName = 'unsafeHTML'), (to.resultType = 1)
const ri = co(to),
  Pl = w`
    .awc-select-item {
        display: flex;
        align-items: center;
        position: relative;
        padding: 10px 14px;
        transition: background-color 0.3s ease;
        cursor: pointer;
        list-style-type: none;
        user-select: none;
    }
    
    :host([selected]) .awc-select-item{
        background-color: var(--colors-light-input-background);
    }

    :host([disabled]) .awc-select-item{
      touch-action: none;
      pointer-events: none;
      opacity: 0.5;
    }

    :host([hidden]) {
        display: none;
    }

    .awc-select-item.no-padding{
        padding: 0;
    }

    .awc-item-focus:focus-visible::after {
        content: "";
        position: absolute;
        border: 1px solid #839FF6; 
        inset: 1px;
        border-radius: var(--corner-radius-m);
    }

    .awc-select-item:hover {
        background-color: var(--colors-light-input-background);
    }

    .awc-select-item__value {
        outline: none;
        display: flex;
        justify-content: start;
        align-items: center;
        gap: var(--spacing-s);
        margin: 0;
        padding: 0;
        font: var(--awc-font-text-regular-14);
        color: var(--colors-light-text);
    }
`
var Al = Object.defineProperty,
  Ll = Object.getOwnPropertyDescriptor,
  Ft = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? Ll(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && Al(e, r, o), o
  }
const eo = 'awc-select-item'
let ft = class extends kt(u) {
  constructor() {
    super(...arguments), (this.selected = !1), (this.disabled = !1)
  }
  /**
   * Устанавливает фокус на элементе
   */
  focus() {
    ;(this.focusTarget.tabIndex = 0), this.focusTarget.focus(), this.onFocus(this.value)
  }
  /**
   * Убирает фокус с элемента
   */
  blur() {
    this.onBlur(this.value), (this.focusTarget.tabIndex = -1)
  }
  /**
   * Вызывает событие выбора элемента
   */
  select() {
    this._onSelect([{ value: this.value, selected: this.selected }])
  }
  _handleEvent() {
    this._onSelect([{ value: this.value, selected: this.selected }]),
      this.dispatchEvent(new Event('change', { composed: !0, bubbles: !0 }))
  }
  handleKeydown(t) {
    ;(t.code === 'Enter' || t.code === 'Space') && (this._onClickOption(), t.preventDefault())
  }
  _onClickOption() {
    ;(this.selected = !0), this._handleEvent()
  }
  render() {
    return l`
      <li
        role="option"
        aria-selected="${this.selected}"
        ?disabled=${this.disabled}
        class="awc-select-item ${this.noPadding ? 'no-padding' : ''}"
        @keydown=${this.handleKeydown}
        @click="${this._onClickOption}"
        @blur=${this.blur}
      >
        <div class="awc-select-item__value awc-item-focus">
          <slot></slot>
        </div>
      </li>
    `
  }
}
ft.shadowRootOptions = {
  ...u.shadowRootOptions,
  delegatesFocus: !0
}
ft.styles = [Pl]
Ft([n({ type: Boolean, reflect: !0 })], ft.prototype, 'selected', 2)
Ft([n({ type: String, reflect: !0 })], ft.prototype, 'value', 2)
Ft([n({ type: Boolean, reflect: !0 })], ft.prototype, 'disabled', 2)
Ft([n({ type: Boolean, reflect: !0, attribute: 'no-padding' })], ft.prototype, 'noPadding', 2)
Ft([P('awc-select-option')], ft.prototype, '_onSelect', 2)
Ft([P('awc-select-option-focus')], ft.prototype, 'onFocus', 2)
Ft([P('awc-select-option-blur')], ft.prototype, 'onBlur', 2)
Ft([S('.awc-item-focus')], ft.prototype, 'focusTarget', 2)
ft = Ft([f(eo)], ft)
const Bl = w`
    .awc-select-button{
        padding: 0 14px;
        gap: 10px;
        width: 100%;
        cursor: pointer;
        height: 40px;
        display: flex;
        align-items: center;
        background: none;
        outline: none;
        border: 1px solid transparent; 
        font: var(--awc-font-text-medium-14);
        color: var(--colors-light-primary);
    }

    .awc-select-button:hover{
        background-color: #F3F4F9;
        transition: .3s ease-in-out;
    }

    .awc-select-button__icon{
        fill: var(--colors-light-primary);
    }

    .awc-select-button:focus-visible{
        transition: border .3s ease;
        border: 1px solid #839FF6; 
        border-radius: var(--corner-radius-m);
    }
`
var Il = Object.defineProperty,
  Tl = Object.getOwnPropertyDescriptor,
  Vt = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? Tl(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && Il(e, r, o), o
  }
const Wi = 'awc-select-button',
  Dl = 'awc-select-button-create'
let Ct = class extends u {
  constructor() {
    super(...arguments),
      (this.slot = 'awc-button'),
      (this.icon = !1),
      (this.staticButton = !1),
      (this.dynamicButton = !1),
      (this.isClick = !1)
  }
  _handleClick() {
    if (
      ((this.isClick = !0),
      this._onClick(this.isClick),
      (this.isClick && this.textContent) || this.label)
    )
      return (this.textContent = '')
  }
  _handleKeyboard(t) {
    if (
      t.code === 'Enter' &&
      (this._handleClick(), (this.isClick && t.code && this.textContent) || this.label)
    )
      return (this.textContent = '')
  }
  _handleLabelOrTextContent() {
    if (this.textContent && this.label && !this.icon) return l`${this.label} «${this.textContent}»`
    if (this.textContent && this.label) return l`${this.textContent}`
    if (this.label) return l`${this.label}`
  }
  render() {
    const t = Q`
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 2C7.44772 2 7 2.44772 7 3V7H3C2.44772 7 2 7.44772 2 8C2 8.55228 2.44772 9 3 9H7V13C7 13.5523 7.44772 14 8 14C8.55228 14 9 13.5523 9 13V9H13C13.5523 9 14 8.55228 14 8C14 7.44772 13.5523 7 13 7H9V3C9 2.44772 8.55228 2 8 2Z" fill="#3761E9"/>
            </svg>
        `
    return l`
            <button 
                class="awc-select-button"
                @click=${this._handleClick}
                @keydown=${this._handleKeyboard}
                label=${this.label}
                tabindex="0"
                >
                    ${this.icon ? l`${t}` : ''}
                    ${this._handleLabelOrTextContent()}
                <slot></slot>
            </button>
        `
  }
}
Ct.styles = [Bl]
Vt([n({ type: String, reflect: !0 })], Ct.prototype, 'slot', 2)
Vt([n({ type: String, reflect: !0 })], Ct.prototype, 'label', 2)
Vt([n({ type: Boolean, reflect: !0 })], Ct.prototype, 'icon', 2)
Vt([n({ type: Boolean, reflect: !0, attribute: 'static-button' })], Ct.prototype, 'staticButton', 2)
Vt(
  [n({ type: Boolean, reflect: !0, attribute: 'dynamic-button' })],
  Ct.prototype,
  'dynamicButton',
  2
)
Vt([n({ type: String })], Ct.prototype, 'copyLabel', 2)
Vt([n()], Ct.prototype, 'textContent', 2)
Vt([P(Dl)], Ct.prototype, '_onClick', 2)
Ct = Vt([f(Wi)], Ct)
const Ml = w`
  .awc-select-group {
    display: flex;
    flex-direction: column;
  }

  .awc-select-group__label {
    color: var(--colors-light-secondary);
    font: var(--awc-font-caption-1-regular);
    padding: 2px 10px;
    margin: 0;
  }

  :host([hidden]) {
    display: none;
  }

  /* .awc-select-group__content {
    padding: 0 10px;
  } */
`
var jl = Object.defineProperty,
  zl = Object.getOwnPropertyDescriptor,
  Gi = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? zl(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && jl(e, r, o), o
  }
const Zi = 'awc-select-group'
let Sr = class extends u {
  render() {
    return l`
            <div class='awc-select-group'>
                <p class='awc-select-group__label'>${this.label}</p>
                <div class='awc-select-group__content'><slot></slot></div>
            </div>
        `
  }
}
Sr.styles = [Ml]
Gi([n({ type: String, reflect: !0 })], Sr.prototype, 'label', 2)
Sr = Gi([f(Zi)], Sr)
const Rl = w`
  :host {
    width: 100%;
    display: block;
  }

  :host([open]) {
    position: relative;
    z-index: 9999;
  }

  .awc-select:focus-visible {
    outline: 1px solid var(--colors-light-focus);;
    border-radius: var(--corner-radius-m);
    inset: -1px;
    transition: 0.3s ease;
  }

  /* .awc-select:focus-visible:before {
    content: "";
    position: absolute;
    transition: 0.3s ease;
    border: 1px solid var(--colors-light-focus);
    inset: -1px;
    border-radius: var(--corner-radius-m);
    pointer-events: none;
  } */

  :host([multiple]) .awc-select__content {
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 6px;
  }

  .awc-select__content {
    margin: 10px 30px 10px 10px;
    width: 100%;
    display: flex;
    align-items: center;
    font: var(--awc-font-text-regular-14);
    color: var(--colors-light-text);
    white-space: nowrap;
    text-overflow: ellipsis;
    user-select: none;
  }

  .awc-select__icons {
    position: absolute;
    height: 100%;
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    right: 0;
    background-color: var(--colors-light-input-background);
    padding: 0 4px 0 4px;
  }

  .arrow-icon {
    transition: transform 0.3s ease;
  }

  .arrow-icon.arrow-rotated {
    transform: rotate(180deg);
  }

  :host([reset]) .awc-select__head {
    min-height: 40px;
  }

  .awc-select__head {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    cursor: pointer;
    background-color: var(--colors-light-input-background);
    min-height: calc(60px - 20px);
    border-radius: var(--corner-radius-m);
  }

  :host([open]) .awc-select__head.border-radius {
    border-radius: var(--corner-radius-m) var(--corner-radius-m) 0px 0px;
  }

  :host([open]) .awc-select__head.border-radius--reverse {
    border-radius: 0px 0px var(--corner-radius-m) var(--corner-radius-m);
  }

  .awc-select__placeholder {
    margin: 0;
    color: var(--colors-light-secondary);
    font: var(--awc-font-text-regular-14);
  }

  .awc-select__options {
    display: none;
    position: absolute;
    left: 0;
    z-index: 99999;
    width: 100%;
    border-top: none;
    border-radius: 0 0 var(--corner-radius-m) var(--corner-radius-m);
    background-color: var(--colors-light-white);
    box-shadow: 0px 5px 8px 0px rgba(64, 72, 98, 0.15);    
  }

  .awc-select-list {
    padding: 0;
    margin: 0;
    list-style-type: none;
    overflow-y: auto;
    max-height: 220px;
  }

  .awc-select__options--open {
    display: block;
    cursor: auto;
    max-height: 100vh;
    transition: opacity .2s ease;
    border-radius: 0 0 4px 4px;
  }

  :host([disabled]) {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  :host([disabled]) .awc-select:focus {
    border: none;
  }

  :host([disabled]) .awc-select:focus:before {
    border: none;
  }

  :host([open]) .options--reverse {
    display: flex;
    flex-direction: column-reverse;
    box-shadow: 0px -5px 8px 0px rgba(64, 72, 98, 0.15);
    border-radius: var(--corner-radius-m) var(--corner-radius-m) 0 0;
  }

  .awc-reset-button {
    margin: 0;
    border: none;
    background: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .awc-select__search {
    position: relative;
    display: flex;
    align-items: center;
    background-color: white;
    padding: 4px;
    top: 0;
    z-index: 1;
  }

  .awc-select__input {
    width: 100%;
    border: none;
    padding: 0 10px;
    position: relative;
    height: 35px;
    border-radius: 0;
    border-bottom: 1px solid var(--colors-light-stroke);
  }

  .awc-select__options--open.options--reverse .awc-select__input {
    border: none;
    border-top: 1px solid var(--colors-light-stroke);
  }

  .awc-select__options--open.options--reverse .awc-select__input:focus {
    transition: border 0.3s ease;
    outline: none;
    border-top: 1px solid #839ff6;
  }

  .awc-select__input:focus {
    transition: border 0.3s ease;
    outline: none;
    border-bottom: 1px solid #839ff6;
  }

  .awc-select-create {
    padding: 1px;
  }

  .awc-select__error,
  .awc-select__hint {
    display: block;
    margin-top: var(--spacing-s);
    font: var(--awc-font-caption-1-regular);
  }

  .awc-select__hint {
    color: var(--colors-light-secondary);
  }

  .awc-select__error {
    color: var(--colors-light-warning);
  }

  .awc-select--error.awc-select:focus:before {
    border-color: var(--colors-light-warning);
  }

  :host([static-error][custom-error][required]) .awc-select  {
    border: 1px solid var(--colors-light-warning);
    border-radius: var(--corner-radius-m);
  }
`,
  Xi = w`
  * ::-webkit-scrollbar {
    display: block;
    height: 10px;
    width: 10px;
    background-color: rgba(0, 0, 0, 0);
    z-index: 99;
  }

  * ::-webkit-scrollbar-button {
    display: none;
    width: 0;
    height: 0;
  }

  * ::-webkit-scrollbar-corner {
    background-color: transparent;
  }

  * ::-webkit-scrollbar-thumb {
    height: 40px;
    border: 3px solid rgba(0, 0, 0, 0) ;
    background-clip: padding-box;
    background-color: rgba(0, 0, 0, 0.2) ;
    -webkit-border-radius: 7px;
    transition: background-color 0.2s;
  }

  * ::-webkit-scrollbar-thumb:hover {
    background-color: #3761e959;
  }
`
var Fl = Object.defineProperty,
  Vl = Object.getOwnPropertyDescriptor,
  I = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? Vl(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && Fl(e, r, o), o
  }
const ql = 'awc-select'
let E = class extends kt(u) {
  constructor() {
    super(...arguments),
      (this.value = ''),
      (this.inputPlacholder = ''),
      (this.html = !1),
      (this.disabled = !1),
      (this.required = !1),
      (this.autoselectOff = !1),
      (this.reset = !1),
      (this.multiple = !1),
      (this.search = !1),
      (this.customError = ''),
      (this.staticError = !1),
      (this.validationMessage = ''),
      (this.filteredOptions = []),
      (this.isOptionListReverse = !1),
      (this.popperInstance = null),
      (this._onInvalid = (t) => {
        t.preventDefault(), this.validationTarget.focus()
      }),
      (this.focusedOptionIndex = -1)
  }
  get options() {
    return [...this.querySelectorAll(eo)]
  }
  get selectedOptions() {
    return this.options.filter((t) => t.selected)
  }
  get optionGroups() {
    return [...this.querySelectorAll(Zi)]
  }
  get selectButtons() {
    return this.querySelector(Wi)
  }
  // Открытие/закрытие списка опций
  _toggleOptionsList() {
    this.selectedOptions.length && this.multiple
      ? this._open()
      : this.open
        ? this._close()
        : this._open()
  }
  _open() {
    ;(this.open = !0),
      this._updateHeadContent(),
      this._createPopperInstance(),
      requestAnimationFrame(() => {
        this.search && this.open && this.inputElement.focus()
      })
  }
  _close() {
    ;(this.open = !1),
      (this.focusedOptionIndex = -1),
      this._unhiddingOptions(),
      this._destroyPopperInstance(),
      this._clearInputValue()
  }
  _unhiddingOptions() {
    this.options.forEach((t) => t.removeAttribute('hidden')),
      this.optionGroups.forEach((t) => t.removeAttribute('hidden'))
  }
  _getItemValueAttribute(t) {
    return t.value
  }
  _getItemTextContent(t) {
    var e
    return (e = t.textContent) == null ? void 0 : e.trim()
  }
  _getItemHTMLContent(t) {
    return ri(t.outerHTML)
  }
  // Получение и обновление контента
  _updateHeadContent() {
    this.selectedOptions.forEach((t) => {
      this.html && t.outerHTML
        ? (t.setAttribute('no-padding', 'true'), (this.headContent = this._getItemHTMLContent(t)))
        : (this.headContent = this._getItemTextContent(t) || this._getItemValueAttribute(t)),
        (this.value = this._getItemValueAttribute(t) || this._getItemTextContent(t)),
        t.removeAttribute('no-padding')
    }),
      this.value && this._updateFormData()
  }
  // Одиночный выбор
  _singleSelection(t) {
    t &&
      (this.options.forEach((e) => (e.selected = !1)),
      (t.selected = !0),
      this._updateHeadContent(),
      this._updateChangeEvent())
  }
  // Множественный выбор
  _multipleSelection(t) {
    this._unhiddingOptions(),
      this.searchText && this._clearInputValue(),
      t && ((t.selected = !0), this._updateHeadContent(), this._updateChangeEvent())
  }
  // Событие выбора элемента
  _handleOption(t) {
    const e = t.target
    e &&
      (this._unhiddingOptions(),
      this.multiple ? this._multipleSelection(e) : this._singleSelection(e))
  }
  // Обновление CustomEvent
  _updateChangeEvent() {
    const t = this.selectedOptions.map((e) => {
      var r, i
      return {
        value: e.value || ((r = e.textContent) == null ? void 0 : r.trim()) || '',
        text: ((i = e.textContent) == null ? void 0 : i.trim()) || '',
        selected: !0
      }
    })
    this._onChangeSelect(t)
  }
  _handleChipsClick(t, e) {
    t.stopPropagation(), this._removeChipsItem(e)
  }
  _renderChips() {
    return this.selectedOptions.map(
      (t, e) => l`
        <awc-chips
          reset-button
          @awc-chips-reset=${(r) => this._handleChipsClick(r, e)}
          @click=${(r) => r.stopPropagation()}
        >
          ${this.html ? ri(t.innerHTML) : t.textContent}
        </awc-chips>
      `
    )
  }
  _removeChipsItem(t) {
    const e = this.selectedOptions[t]
    e &&
      ((e.selected = !1),
      this.selectedOptions.splice(t, 1),
      this._updateHeadContent(),
      this._updateChangeEvent()),
      this.selectedOptions.length || this.resetFormControl()
  }
  // Обновление FormData
  _updateFormData() {
    const t = new FormData()
    if (this.multiple && this.selectedOptions.length)
      this.selectedOptions.forEach((e) => this._appendOptionToFormData(t, e))
    else {
      const e = this.selectedOptions.find((r) => r.selected)
      e && this._appendOptionToFormData(t, e)
    }
    this.value = t
  }
  _appendOptionToFormData(t, e) {
    const r = e.getAttribute('value') || e.textContent
    return t.append(this.name, r)
  }
  // Валидация
  validityCallback() {
    const t = document.createElement('select')
    return (t.required = this.required), t.validationMessage
  }
  validationMessageCallback(t) {
    this.customError && !this.staticError
      ? ((this.validationMessage = t), (this.validationMessage = this.customError))
      : (this.validationMessage = t)
  }
  // Срабатывает тогда, когда есть заданный атрибут selected
  _setSelectedElement() {
    this.selectedOptions.length >= 1 &&
      !this.multiple &&
      (this.selectedOptions.forEach((t, e) => {
        e === 0 ? (t.selected = !0) : (t.selected = !1)
      }),
      this._updateHeadContent())
  }
  // Срабатывает тогда, когда нет ни одного атрибута selected
  _setAutoSelectedFirstElement() {
    this.selectedOptions.length === 0 &&
      !this.multiple &&
      this.options.length > 0 &&
      ((this.options[0].selected = !0), this._updateHeadContent())
  }
  // Сброс селекта
  resetFormControl() {
    this.options.forEach((t) => (t.selected = !1)),
      (this.value = ''),
      (this.headContent = ''),
      this._onChangeSelect([]),
      this._close()
  }
  // Кнопка сброса в селект
  _resetButton() {
    if (this.reset && this.selectedOptions.length > 0)
      return l`<awc-toolbar-button
        type="button"
        @click=${this._handleResetClick}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.70712 3.29289C4.3166 2.90237 3.68343 2.90237 3.29291 3.29289C2.90238 3.68342 2.90238 4.31658 3.29291 4.70711L6.5821 7.9963L3.29212 11.2937C2.90203 11.6847 2.90274 12.3178 3.2937 12.7079C3.68467 13.098 4.31783 13.0973 4.70792 12.7063L7.99632 9.41052L11.2929 12.7071C11.6834 13.0976 12.3166 13.0976 12.7071 12.7071C13.0976 12.3166 13.0976 11.6834 12.7071 11.2929L9.40894 7.99472L12.69 4.70631C13.0801 4.31535 13.0793 3.68219 12.6884 3.2921C12.2974 2.90201 11.6643 2.90273 11.2742 3.29369L7.99473 6.5805L4.70712 3.29289Z"
            fill="#919BB6"
          />
        </svg>
      </awc-toolbar-button>`
  }
  _handleResetClick(t) {
    t.stopPropagation(), this.resetFormControl()
  }
  _handleOptionKeyboard(t) {
    if (t.code === 'Enter' || t.code === 'Space')
      this._toggleOptionsList(), t.preventDefault(), t.stopPropagation()
    else if (this.open === !1 && ['ArrowDown', 'ArrowUp'].includes(t.code))
      this._open(), t.preventDefault()
    else if (t.code === 'Escape') this._close(), t.preventDefault()
    else if (this.open && ['ArrowDown', 'ArrowUp'].includes(t.code)) {
      if (
        (this.isOptionListReverse
          ? (t.code === 'ArrowUp' && this.focusedOptionIndex--,
            t.code === 'ArrowDown' && this.focusedOptionIndex++)
          : (t.code === 'ArrowDown' && this.focusedOptionIndex++,
            t.code === 'ArrowUp' && this.focusedOptionIndex--),
        this.search && this.searchText)
      ) {
        if (this.filteredOptions.length === 0) return
        ;(this.focusedOptionIndex = Math.max(
          0,
          Math.min(this.focusedOptionIndex, this.filteredOptions.length - 1)
        )),
          this.filteredOptions[this.focusedOptionIndex].focus()
      } else {
        const e = this.options.filter((r) => r.tagName === 'AWC-SELECT-ITEM')
        ;(this.focusedOptionIndex = Math.max(0, Math.min(this.focusedOptionIndex, e.length - 1))),
          e[this.focusedOptionIndex].focus()
      }
      this.scrollToFocusedOption(), t.preventDefault()
    }
  }
  scrollToFocusedOption() {
    const t = this.optionList.children[this.focusedOptionIndex]
    t && t.scrollIntoView({ block: 'nearest' })
  }
  // Закрытие списка опшенов при клике на любой другой элемент
  _handleDocumentClick(t) {
    t.composedPath().includes(this) || this._close()
  }
  // Обработчик ввода текста в поле поиска
  _handleInput() {
    ;(this.searchText = this.inputElement.value),
      this._filterOptions(),
      this._buttonSearchTextUpdate(),
      this._onSearch(this.searchText)
  }
  _handleInputKeydown(t) {
    ;(t.code === 'Enter' || t.code === 'Space') && this.open && t.stopPropagation()
  }
  _buttonSearchTextUpdate() {
    if (this.selectButtons) return (this.selectButtons.textContent = this.searchText)
  }
  _staticCreateButton() {
    if (this.selectButtons.isClick) {
      const e = this._buttonSearchTextUpdate()
      this._onCreateOption({ value: e, selected: !0, text: e })
    }
  }
  _dynamicCreateOption() {
    if (this.selectButtons.isClick) {
      const e = this._buttonSearchTextUpdate()
      this.createSelectItem(e, e, !0),
        this._onCreateOption({ value: e, selected: !0, text: e }),
        this._clearInputValue()
    }
  }
  createSelectItem(t, e, r) {
    const i = document.createElement(eo)
    this.html ? (i.innerHTML = t) : (i.textContent = t),
      (i.value = e ?? t),
      r &&
        ((i.selected = !0),
        this.multiple || this.selectedOptions.forEach((o) => (o.selected = !1))),
      this.appendChild(i),
      this.requestUpdate(),
      this._updateHeadContent(),
      this._unhiddingOptions(),
      this._updateFormData()
  }
  handleCreateOption(t) {
    if (this.inputElement) {
      if (t.target && this.inputElement.value === '') return
      {
        const e = this.selectButtons.staticButton,
          r = this.selectButtons.dynamicButton
        e && this._staticCreateButton(), r && this._dynamicCreateOption()
      }
    }
  }
  // Фильтрация опций на основе введенного текста
  _filterOptions() {
    const t = this.searchText.toLowerCase()
    ;(this.filteredOptions = this.options.filter((e) => {
      var o
      const r = (o = e.textContent) == null ? void 0 : o.toLowerCase(),
        i = r == null ? void 0 : r.includes(t)
      return i ? e.removeAttribute('hidden') : e.setAttribute('hidden', ''), i
    })),
      this._filterGroups(),
      this.scrollToFocusedOption()
  }
  _filterGroups() {
    this.optionGroups.forEach((t) => {
      Array.from(t.children).some((r) => !r.hasAttribute('hidden'))
        ? t.removeAttribute('hidden')
        : t.setAttribute('hidden', '')
    })
  }
  _showPlaceholderOrSelectItem() {
    return this.multiple && this.placeholder
      ? this.selectedOptions.length
        ? this._renderChips()
        : l`<p class="awc-select__placeholder">${this.placeholder}</p>`
      : this.multiple && !this.placeholder
        ? this._renderChips()
        : this.headContent
          ? this.headContent
          : l`<p class="awc-select__placeholder">${this.placeholder}</p>`
  }
  _renderInput() {
    return l`
      <div class="awc-select__search">
        <input
          class="awc-select__input"
          type="text"
          placeholder=${this.inputPlacholder}
          autocomplete="off"
          tabindex="0"
          @input=${this._handleInput}
          @keydown=${(t) => this._handleInputKeydown(t)}
          @click=${(t) => t.stopPropagation()}
        />
      </div>
    `
  }
  _clearInputValue() {
    this.inputElement && ((this.searchText = ''), (this.inputElement.value = ''))
  }
  _checkingListPosition() {
    this._selectOptions &&
      requestAnimationFrame(() => {
        this._selectOptions.getAttribute('data-popper-placement') === 'top'
          ? (this.isOptionListReverse = !0)
          : (this.isOptionListReverse = !1)
      })
  }
  _createPopperInstance() {
    this._selectHead &&
      this._selectOptions &&
      ((this.popperInstance = xo(this._selectHead, this._selectOptions, {
        placement: 'bottom',
        modifiers: [
          {
            name: 'flip',
            options: {
              fallbackPlacements: ['top']
            }
          },
          {
            name: 'preventOverflow',
            options: {
              boundary: 'viewport'
            }
          },
          {
            name: 'offset',
            options: {
              offset: [0, 0]
            }
          }
        ],
        strategy: 'absolute'
      })),
      this.popperInstance.forceUpdate())
  }
  _destroyPopperInstance() {
    var t
    ;(t = this.popperInstance) == null || t.destroy(), (this.popperInstance = null)
  }
  _renderMultipleSelect() {
    const t = {
        'awc-select': !0,
        'awc-select--error': this.showError
      },
      e = {
        'awc-select__options': !0,
        'awc-select__options--open': this.open
      },
      r = {
        'awc-select__head': !0,
        'border-radius': !0,
        'border-radius--reverse': this.isOptionListReverse
      },
      i = l`
      <awc-toolbar-button
        @click=${(o) => {
          o.stopPropagation(), this._close()
        }}
      >
        <svg
          class="arrow-icon ${this.open ? 'arrow-rotated' : ''}"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.29289 5.29289C3.68342 4.90237 4.31658 4.90237 4.70711 5.29289L8 8.58579L11.2929 5.29289C11.6834 4.90237 12.3166 4.90237 12.7071 5.29289C13.0976 5.68342 13.0976 6.31658 12.7071 6.70711L8.70711 10.7071L8 11.4142L7.29289 10.7071L3.29289 6.70711C2.90237 6.31658 2.90237 5.68342 3.29289 5.29289Z"
            fill="#919BB6"
          />
        </svg>
      </awc-toolbar-button>
    `
    return l`<div
        class=${et(t)}
        name=${this.name}
        .value=${this.value}
        tabindex="0"
        ?autoselect-off=${this.autoselectOff}
        ?disabled=${this.disabled}
        ?required=${this.required}
        multiple
        @click=${this._toggleOptionsList}
        @keydown=${this._handleOptionKeyboard}
      >
        <div class="${et(r)}">
          <div class="awc-select__content">
            ${this._showPlaceholderOrSelectItem()}
          </div>
          <div class="awc-select__icons">
            ${this._resetButton()} ${i}
          </div>
        </div>

        <div class=${et(e)}>
          ${this.search ? this._renderInput() : ''}
          <ul
            class="awc-select-list"
            tabindex="${F(this.open ? void 0 : '-1')}"
            @awc-select-option=${this._handleOption}
          >
            <slot></slot>
          </ul>
          <div class="awc-select-create">
            <slot
              @awc-select-button-create=${this.handleCreateOption}
              name="awc-button"
            ></slot>
          </div>
        </div>
      </div>

      ${this.showError && this.required && !this.staticError ? l`<span class="awc-select__error">${this.validationMessage}</span>` : this.hint && !this.staticError ? l`<span class="awc-select__hint">${this.hint}</span>` : ''}
      ${this.staticError && this.required && this.customError ? l`<span class="awc-select__error">${this.customError}</span>` : this.hint && this.staticError ? l`<span class="awc-select__hint">${this.hint}</span>` : ''} `
  }
  _renderSingleSelect() {
    const t = {
        'awc-select': !0,
        'awc-select--error': this.showError || (this.staticError && this.required)
      },
      e = {
        'awc-select__options': !0,
        'awc-select__options--open': this.open,
        'awc-select--error': this.showError
      },
      r = {
        'awc-select__head': !0,
        'border-radius': !0,
        'border-radius--reverse': this.isOptionListReverse
      },
      i = l`
      <awc-toolbar-button
        @click=${(o) => {
          o.stopPropagation(), this._toggleOptionsList()
        }}
      >
        <svg
          class="arrow-icon ${this.open ? 'arrow-rotated' : ''}"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.29289 5.29289C3.68342 4.90237 4.31658 4.90237 4.70711 5.29289L8 8.58579L11.2929 5.29289C11.6834 4.90237 12.3166 4.90237 12.7071 5.29289C13.0976 5.68342 13.0976 6.31658 12.7071 6.70711L8.70711 10.7071L8 11.4142L7.29289 10.7071L3.29289 6.70711C2.90237 6.31658 2.90237 5.68342 3.29289 5.29289Z"
            fill="#919BB6"
          />
        </svg>
      </awc-toolbar-button>
    `
    return l`
      <div
        class=${et(t)}
        name=${this.name}
        .value=${this.value}
        tabindex="0"
        ?disabled=${this.disabled}
        ?required=${this.required}
        ?autoselect-off=${this.autoselectOff}
        @click=${this._toggleOptionsList}
        @keydown=${this._handleOptionKeyboard}
      >
        <div class="${et(r)}">
          <div class="awc-select__content">
            ${this._showPlaceholderOrSelectItem()}
          </div>
          <div class="awc-select__icons">
            ${this._resetButton()} ${i}
          </div>
        </div>

        <div class=${et(e)}>
          ${this.search ? this._renderInput() : ''}

          <ul
            class="awc-select-list"
            tabindex="${F(this.open ? void 0 : '-1')}"
            @awc-select-option=${this._handleOption}
          >
            <slot></slot>
          </ul>

          <div class="awc-select-create">
            <slot
              @awc-select-button-create=${this.handleCreateOption}
              name="awc-button"
            ></slot>
          </div>
        </div>
      </div>

      ${this.showError && this.required && !this.staticError ? l`<span class="awc-select__error">${this.validationMessage}</span>` : this.hint && !this.staticError ? l`<span class="awc-select__hint">${this.hint}</span>` : ''}
      ${this.staticError && this.required && this.customError ? l`<span class="awc-select__error">${this.customError}</span>` : this.hint && this.staticError ? l`<span class="awc-select__hint">${this.hint}</span>` : ''}
    `
  }
  connectedCallback() {
    super.connectedCallback(),
      this.addEventListener('invalid', this._onInvalid),
      document.addEventListener('click', (t) => this._handleDocumentClick(t)),
      document.addEventListener('DOMContentLoaded', () => {
        this.autoselectOff ? this._setSelectedElement() : this._setAutoSelectedFirstElement()
      })
  }
  updated(t) {
    super.updated(t),
      (t.has('value') || t.has('html')) && this.setValue(this.value),
      t.has('open') && this._checkingListPosition(),
      this.disabled && this.open && this._close(),
      t.has('searchText') && this._buttonSearchTextUpdate(),
      t.has('multiple') && this._updateHeadContent(),
      t.has('autoselectOff') &&
        (this.autoselectOff ? this._setSelectedElement() : this._setAutoSelectedFirstElement())
  }
  render() {
    return this.multiple ? this._renderMultipleSelect() : this._renderSingleSelect()
  }
}
E.formControlValidators = [Dr]
E.shadowRootOptions = {
  ...u.shadowRootOptions,
  delegatesFocus: !0
}
E.styles = [Xi, Rl]
I([n({ type: String, reflect: !0 })], E.prototype, 'name', 2)
I([n({ type: String, attribute: !1 })], E.prototype, 'value', 2)
I([n({ type: String, reflect: !0 })], E.prototype, 'placeholder', 2)
I([n({ type: String, attribute: 'input-placeholder' })], E.prototype, 'inputPlacholder', 2)
I([n({ type: String, reflect: !0 })], E.prototype, 'hint', 2)
I([n({ type: Boolean, reflect: !0 })], E.prototype, 'html', 2)
I([n({ type: Boolean, reflect: !0 })], E.prototype, 'open', 2)
I([n({ type: Boolean, reflect: !0 })], E.prototype, 'disabled', 2)
I([n({ type: Boolean, reflect: !0 })], E.prototype, 'required', 2)
I([n({ type: Boolean, reflect: !0, attribute: 'autoselect-off' })], E.prototype, 'autoselectOff', 2)
I([n({ type: Boolean, reflect: !0 })], E.prototype, 'reset', 2)
I([n({ type: Boolean, reflect: !0 })], E.prototype, 'multiple', 2)
I([n({ type: Boolean, reflect: !0 })], E.prototype, 'search', 2)
I([n({ reflect: !0, attribute: 'custom-error' })], E.prototype, 'customError', 2)
I([n({ type: Boolean, reflect: !0, attribute: 'static-error' })], E.prototype, 'staticError', 2)
I([S('.awc-select__input')], E.prototype, 'inputElement', 2)
I([S('.awc-select')], E.prototype, 'validationTarget', 2)
I([S('.awc-select-list')], E.prototype, 'optionList', 2)
I([S('.awc-select')], E.prototype, '_selectHead', 2)
I([S('.awc-select__options')], E.prototype, '_selectOptions', 2)
I([Y()], E.prototype, 'validationMessage', 2)
I([Y()], E.prototype, 'headContent', 2)
I([Y()], E.prototype, 'searchText', 2)
I([Y()], E.prototype, 'filteredOptions', 2)
I([Y()], E.prototype, 'isOptionListReverse', 2)
I([P('awc-select-search')], E.prototype, '_onSearch', 2)
I([P('awc-create-option')], E.prototype, '_onCreateOption', 2)
I([P('awc-select-change')], E.prototype, '_onChangeSelect', 2)
E = I([f(ql)], E)
const Hl = w`
    :host {
        display: block;
        contain: content;
    }

    .awc-die {
        overflow: hidden;
        position: relative;
        padding: 8px 14px 8px 16px;
        max-height: 44px;
        height: calc(44px - 16px);
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: var(--corner-radius-s);
        gap: var(--spacing-sm);
        z-index: 1; 
    }

    .awc-die::before {
        content: ""; 
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: var(--awc-opacity, 0.1);
        background-color: var(--awc-die-color);
        z-index: -1; 
    }

    .awc-die::after {
        content: '';
        position: absolute;
        left: 0;
        height: 100%;
        width: 3px;
        background-color: var(--awc-die-color);
    }

    .awc-die__main {
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 22px;
        display: flex;
        align-items: center;
        gap: var(--spacing-s);
    }

    .awc-die__content {
        font: var(--awc-font-text-medium-15);
        color: var(--colors-light-titles);
        position: absolute;
        margin: 0;
        white-space: nowrap;
    }

    .awc-die__content.awc-die__content--edit{
        outline: none;
        padding: 0;
        width: 100%;
        border: none;
        background-color: rgba(255, 255, 255, 0) ;
        font: var(--awc-font-text-medium-15);
        color: var(--colors-light-titles);
    }
    
    .awc-die__icon{
        cursor: move;
        position: relative;
        display: flex;
    }

    .awc-die__slotted{
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
    }
`
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ul = Symbol.for(''),
  Nl = (t) => {
    if ((t == null ? void 0 : t.r) === Ul) return t == null ? void 0 : t._$litStatic$
  },
  oi = /* @__PURE__ */ new Map(),
  Wl =
    (t) =>
    (e, ...r) => {
      const i = r.length
      let o, s
      const a = [],
        d = []
      let c,
        h = 0,
        p = !1
      for (; h < i; ) {
        for (c = e[h]; h < i && ((s = r[h]), (o = Nl(s)) !== void 0); ) (c += o + e[++h]), (p = !0)
        h !== i && d.push(s), a.push(c), h++
      }
      if ((h === i && a.push(e[i]), p)) {
        const g = a.join('$$lit$$')
        ;(e = oi.get(g)) === void 0 && ((a.raw = a), oi.set(g, (e = a))), (r = d)
      }
      return t(e, ...r)
    },
  Gl = Wl(Q)
var Zl = Object.defineProperty,
  Xl = Object.getOwnPropertyDescriptor,
  Bt = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? Xl(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && Zl(e, r, o), o
  }
let wt = class extends u {
  constructor() {
    super(...arguments),
      (this.text = ''),
      (this.placeholder = ''),
      (this.editing = !1),
      (this.tabIndex = 0),
      (this.color = '--colors-light-primary')
  }
  /**
   * Подключение колбэков обратного вызова для обработки событий.
   */
  connectedCallback() {
    super.connectedCallback(),
      this.addEventListener('focus', this.handleFocus),
      this.addEventListener('blur', this.handleBlur),
      this.addEventListener('dblclick', this.handleMouseDown)
  }
  /**
   * Обработка фокусировки.
   */
  handleFocus() {
    this._onFocus(this.text)
  }
  /**
   * Обработка потери фокуса.
   */
  handleBlur() {
    this._onBlur(this.text), this.stopEditing(), this.triggerChange()
  }
  /**
   * Обработка нажатия кнопки мыши.
   */
  handleMouseDown() {
    this.startEditing(), this.setCursorToEnd()
  }
  /**
   * Обработка ввода текста.
   */
  handleInput() {
    this.contentElement && (this.text = this.contentElement.value)
  }
  /**
   * Обработка нажатия клавиши Enter.
   */
  handleEnterKey(t) {
    t.key === 'Enter' && (t.preventDefault(), this.handleFocus(), this.blur())
  }
  /**
   * Установка курсора в конец текста.
   */
  setCursorToEnd() {
    if (this.contentElement) {
      const t = this.contentElement.value.length
      this.contentElement.setSelectionRange(t, t)
    }
  }
  /**
   * Начало редактирования.
   */
  startEditing() {
    this.editing = !0
  }
  /**
   * Завершение редактирования.
   */
  stopEditing() {
    this.editing = !1
  }
  /**
   * Запуск события изменения.
   */
  triggerChange() {
    this._onChange(this.text)
  }
  /**
   * Обновление компонента.
   */
  updated(t) {
    super.updated(t),
      t.has('editing')
        ? (this._renderEditMode(), this.contentElement && this.contentElement.focus())
        : this._renderReadOnlyMode()
  }
  /**
   * Отображение компонента в режиме редактирования.
   */
  _renderEditMode() {
    return l`
            <input 
                class='awc-die__content awc-die__content--edit' 
                placeholder=${this.placeholder} 
                .value=${this.text} 
                @input=${this.handleInput}
                @keyup=${this.handleEnterKey}
                tabindex=${this.tabIndex}
                type='text'
            >
        `
  }
  /**
   * Отображение компонента в режиме только для чтения.
   */
  _renderReadOnlyMode() {
    return l`
            <p class='awc-die__content'>${this.text}</p>
        `
  }
  /**
   * Отображение иконки компонента.
   */
  _renderIcon() {
    const t = Gl`
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2 5C1.44772 5 1 5.44772 1 6C1 6.55228 1.44772 7 2 7H14C14.5523 7 15 6.5523 15 6C15 5.44772 14.5523 5 14 5H2ZM2 9C1.44772 9 1 9.44772 1 10C1 10.5523 1.44772 11 2 11H14C14.5523 11 15 10.5523 15 10C15 9.44772 14.5523 9 14 9H2Z" fill="#919BB6"/>
            </svg>
        `
    return l`
            <div class='awc-die__icon'>
                ${t}
            </div>
        `
  }
  /**
   * Отображение компонента.
   */
  render() {
    const t = this.color && this.color.startsWith('--')
    return l`
            <div class='awc-die' style=${t ? `--awc-die-color: var(${this.color})` : `--awc-die-color: ${this.color}`} >
                ${this._renderIcon()}
                <div class='awc-die__main'>
                    ${this.editing ? this._renderEditMode() : this._renderReadOnlyMode()}
                </div>
                <div class='awc-die__slotted'>
                    <slot></slot>
                </div>
            </div>
        `
  }
}
wt.styles = [Hl]
Bt([n({ type: String })], wt.prototype, 'text', 2)
Bt([n({ type: String })], wt.prototype, 'placeholder', 2)
Bt([n({ type: Boolean, reflect: !0 })], wt.prototype, 'editing', 2)
Bt([n({ type: Number })], wt.prototype, 'tabIndex', 2)
Bt([n({ type: String, attribute: 'color' })], wt.prototype, 'color', 2)
Bt([P('awc-die-change')], wt.prototype, '_onChange', 2)
Bt([P('awc-die-focus')], wt.prototype, '_onFocus', 2)
Bt([P('awc-die-blur')], wt.prototype, '_onBlur', 2)
Bt([S('.awc-die__content--edit')], wt.prototype, 'contentElement', 2)
wt = Bt([f('awc-die')], wt)
const Kl = w`
    .awc-stager{
        overflow: hidden;
        border-radius: var(--corner-radius-circular);
    }

    .awc-stager__progress{
        display: flex;
        align-items: center;
        gap: 2px;
        width: 100%;
        height: 10px;
        border-radius: var(--corner-radius-s);
    }

    .awc-stager__item{
        width: 100%;
        background-color: #D6DBE5;
        height: inherit;
    }

    .awc-stager__item--current{
        background-color: var(--colors-light-primary);
    }

`
var Yl = Object.defineProperty,
  Jl = Object.getOwnPropertyDescriptor,
  cr = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? Jl(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && Yl(e, r, o), o
  }
let he = class extends u {
  constructor() {
    super(...arguments),
      (this.steps = 5),
      (this.current = 2),
      (this.stepColor = '--colors-light-primary'),
      (this._connected = !1)
  }
  connectedCallback() {
    super.connectedCallback(), (this._connected = !0), this._stepUpdater()
  }
  _handleChange() {
    this._onChange(this.current)
  }
  _colorUpdater(t) {
    t &&
      (this.stepColor.startsWith('--')
        ? (t.style.cssText = `background-color: var(${this.stepColor})`)
        : (t.style.cssText = `background-color: ${this.stepColor}`))
  }
  _stepUpdater() {
    var r
    if (!this._connected) return
    let t = this.current
    ;(isNaN(t) || t < 1) && ((t = 1), (this.current = t)),
      ((r = this.shadowRoot) == null ? void 0 : r.querySelectorAll('.awc-stager__item')).forEach(
        (i, o) => {
          const a = o + 1 < t + 1
          i.classList.toggle('awc-stager__item--current', a) && this._colorUpdater(i)
        }
      )
  }
  attributeChangedCallback(t, e, r) {
    super.attributeChangedCallback(t, e, r),
      t === 'step-color' && r !== null && ((this.stepColor = r), this._stepUpdater())
  }
  updated(t) {
    super.updated(t), t.has('current') && (this._stepUpdater(), this._handleChange())
  }
  render() {
    return l`
      <div class="awc-stager">
        <div class="awc-stager__progress">${this._renderProgress()}</div>
      </div>
    `
  }
  _renderProgress() {
    return Array.from({ length: this.steps }, () => l`<div class="awc-stager__item"></div>`)
  }
}
he.styles = [Kl]
cr([n({ type: Number, reflect: !0 })], he.prototype, 'steps', 2)
cr([n({ type: Number, reflect: !0 })], he.prototype, 'current', 2)
cr([n({ type: String, attribute: 'step-color' })], he.prototype, 'stepColor', 2)
cr([P('awc-stager-change')], he.prototype, '_onChange', 2)
he = cr([f('awc-stager')], he)
const Ql = w`
    :host{
        display: inline-block;
        contain: content;
    }

    .awc-chips{
        display: flex;
        align-items: center;
        padding: 4px 12px;
        gap: 6px;
        font: var(--awc-font-text-regular-14);
        color: var(--colors-light-text);
        background-color: var(--colors-light-stroke-hover);
        border-radius: var(--corner-radius-2xl);
        transition: background-color .3s ease-in-out;
    }

    .awc-chips.awc-chips__avatar{
        padding: 4px 12px 4px 3px;
    }

    :host([reset-button]){
        cursor: pointer;
    }

    :host([reset-button]:hover) .awc-chips{
       background-color: var(--colors-light-stroke);
    }

    :host([reset-button]) .awc-chips__reset{
      fill: var(--colors-light-secondary);
      transition: fill .3s ease-in-out;
    }

    :host([reset-button]:hover) .awc-chips__reset{
      fill: var(--colors-light-primary);
    }
`
var tc = Object.defineProperty,
  ec = Object.getOwnPropertyDescriptor,
  dr = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? ec(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && tc(e, r, o), o
  }
let ue = class extends u {
  constructor() {
    super(...arguments), (this.resetButton = !1)
  }
  _checkedAwcAvatar() {
    this.slotElement.assignedNodes().filter((e) => e.nodeName.toLowerCase() === 'awc-avatar')
      .length === 1
      ? this.chips.classList.add('awc-chips__avatar')
      : this.chips.classList.remove('awc-chips__avatar')
  }
  handleResetClick() {
    this._onRemoveChips(this.resetButton)
  }
  updated(t) {
    super.updated(t), this._checkedAwcAvatar()
  }
  render() {
    return l`
            <div class='awc-chips'>
                <slot @slotchange=${this._checkedAwcAvatar}></slot>
                ${
                  this.resetButton
                    ? l`
                    <svg class="awc-chips__reset" @click=${this.handleResetClick} width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.70713 4.29291C5.3166 3.90239 4.68344 3.90239 4.29291 4.29291C3.90239 4.68344 3.90239 5.3166 4.29291 5.70713L6.58237 7.99658L4.29185 10.294C3.90191 10.6851 3.90286 11.3182 4.29397 11.7082C4.68508 12.0981 5.31824 12.0972 5.70818 11.7061L7.99659 9.4108L10.2929 11.7071C10.6834 12.0976 11.3166 12.0976 11.7071 11.7071C12.0976 11.3166 12.0976 10.6834 11.7071 10.2929L9.40868 7.99447L11.6902 5.70607C12.0802 5.31496 12.0792 4.68179 11.6881 4.29185C11.297 3.90191 10.6638 3.90286 10.2739 4.29397L7.99447 6.58025L5.70713 4.29291Z"/>
                    </svg>`
                    : ''
                }
            </div>
        `
  }
}
ue.styles = [Ql]
dr([n({ type: Boolean, reflect: !0, attribute: 'reset-button' })], ue.prototype, 'resetButton', 2)
dr([P('awc-chips-reset')], ue.prototype, '_onRemoveChips', 2)
dr([S('.awc-chips')], ue.prototype, 'chips', 2)
dr([S('slot')], ue.prototype, 'slotElement', 2)
ue = dr([f('awc-chips')], ue)
const rc = w`
  :host {
    display: inline-flex;
  }

  p {
    margin: 0;
  }

  .awc-user-info__wrapper{
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .awc-user-info--link{
    text-decoration: none;
  }

  .awc-user-info--link .awc-user-info__name{
    transition: color .25s ease-in-out;
  }

  .awc-user-info--link:hover .awc-user-info__name{
    color: var(--colors-light-primary-hover);
  }
  
  .awc-user-info__main {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
  }

  .awc-user-info__description {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  .awc-user-info__description--reverse {
    flex-direction: column-reverse;
  }

  .awc-user-info__name {
    font: var(--awc-font-text-regular-14);
    color: var(--colors-light-titles);
  }

  .awc-user-info__status {
    font: var(--awc-font-caption-2-regular);
    color: var(--colors-light-secondary);
  }

  .awc-user-info__additional {
    display: none;
    font: var(--awc-font-text-regular-14);
    padding: 12px 16px;
    border-radius: 0 var(--corner-radius-l) var(--corner-radius-l)
      var(--corner-radius-l);
    overflow-wrap: anywhere;
  }

  .awc-user-info__additional.empty:not(.awc-user-info__additional--none) {
    display: block;
  }

  .awc-user-info__additional--complete {
    background-color: rgba(53, 211, 172, 0.1);
  }

  .awc-user-info__additional--complete {
    color: var(--colors-light-success);
  }

  .awc-user-info__additional--fail {
    background-color: rgba(255, 113, 136, 0.1);
  }

  .awc-user-info__additional--fail {
    color: var(--colors-light-warning);
  }
`
var oc = Object.defineProperty,
  ic = Object.getOwnPropertyDescriptor,
  It = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? ic(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && oc(e, r, o), o
  }
let bt = class extends u {
  constructor() {
    super(...arguments),
      (this.reverse = !1),
      (this.status = 'none'),
      (this.target = '_self'),
      (this.avatatColor = xi.GlobalBlue400)
  }
  render() {
    return this.href
      ? l`
          <div class="awc-user-info__wrapper">
            <a
              class="awc-user-info awc-user-info--link"
              href=${this.href}
              target=${this.target}
              name=${this.name}
              ?reverse=${this.reverse}
            >
              <div class="awc-user-info__main">
                <awc-avatar
                  size="32"
                  title=${this.name}
                  image-link=${this.avatarLink}
                  status=${this.status}
                  color=${this.avatatColor}
                  custom-color="${this.avatarCustomColor}"
                ></awc-avatar>
                <div
                  class="awc-user-info__description ${this.reverse ? 'awc-user-info__description--reverse' : ''}"
                >
                  ${this.name ? l`<p class="awc-user-info__name">${this.name}</p>` : ''}
                  ${
                    this.description
                      ? l`<p class="awc-user-info__status">
                        ${this.description}
                      </p>`
                      : ''
                  }
                </div>
              </div>
            </a>
          </div>
        `
      : l`
          <div class="awc-user-info__wrapper">
            <div
              class="awc-user-info"
              name=${this.name}
              ?reverse=${this.reverse}
            >
              <div class="awc-user-info__main">
                <awc-avatar
                  size="32"
                  title=${this.name}
                  image-link=${this.avatarLink}
                  status=${this.status}
                  color=${this.avatatColor}
                  custom-color="${this.avatarCustomColor}"
                ></awc-avatar>
                <div
                  class="awc-user-info__description ${this.reverse ? 'awc-user-info__description--reverse' : ''}"
                >
                  ${this.name ? l`<p class="awc-user-info__name">${this.name}</p>` : ''}
                  ${
                    this.description
                      ? l`<p class="awc-user-info__status">
                        ${this.description}
                      </p>`
                      : ''
                  }
                </div>
              </div>
            </div>
          </div>
        `
  }
}
bt.styles = [rc]
It([n({ type: String, reflect: !0 })], bt.prototype, 'name', 2)
It([n({ type: String, reflect: !0 })], bt.prototype, 'description', 2)
It([n({ type: Boolean, reflect: !0 })], bt.prototype, 'reverse', 2)
It([n({ type: String, reflect: !0, attribute: 'avatar-status' })], bt.prototype, 'status', 2)
It([n({ type: String, attribute: 'avatar-image' })], bt.prototype, 'avatarLink', 2)
It([n({ type: String })], bt.prototype, 'target', 2)
It([n({ type: String, attribute: 'avatar-custom-color' })], bt.prototype, 'avatarCustomColor', 2)
It([n({ type: String })], bt.prototype, 'href', 2)
It([n({ type: String, attribute: 'avatar-color' })], bt.prototype, 'avatatColor', 2)
bt = It([f('awc-user-info')], bt)
const sc = w`
    :host{
        display: inline-block;
    }

    .awc-button-group{
        display: inline-flex;
        align-items: center;
    }

    :host([disabled]) .awc-button-group{
        pointer-events: none;
        opacity: .5;
        touch-action: none;
    }
`,
  ac = w`
  :host {
    display: inline-block;
  }

  .awc-button-group-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin: 0;
    height: 36px;
    max-height: 36px;
    min-width: 36px;
    padding: 5px;
    border-radius: var(--corner-radius-s);
    border: 1px solid var(--colors-light-stroke);
    background-color: var(--colors-light-white);
    font: var(--awc-font-text-regular-14);
    color: var(--colors-light-text);
    border-top: 1px solid var(--colors-light-stroke);
    border-bottom: 1px solid var(--colors-light-stroke);
    transition: border-color 0.2s ease;
  }

  .awc-button-group-item.first {
    border-right: none;
    border-radius: var(--corner-radius-s) 0 0 var(--corner-radius-s);
  }

  .awc-button-group-item.last {
    border-left: none;
    border-radius: 0 var(--corner-radius-s) var(--corner-radius-s) 0;
  }

  .awc-button-group-item.inner-last {
    border-right: 1px solid var(--colors-light-stroke);
  }

  .awc-button-group-item.inner {
    border-radius: 0px;
    border-top: 1px solid var(--colors-light-stroke);
    border-bottom: 1px solid var(--colors-light-stroke);
    transition: color 0.3s ease-in-out 0s;
    border-right: none;
  }

  .awc-button-group-item.inner.inner-last{
    border-right: 1px solid var(--colors-light-stroke);
  }

  .awc-button-group-item > ::slotted(awc-icon) {
    transition: fill .3s ease-in-out;
  }

  .awc-button-group-item:hover > ::slotted(awc-icon),
  .awc-button-group-item.inner:hover {
    fill: var(--colors-light-primary);
    color: var(--colors-light-primary);
  }

  :host([expanded]) .awc-button-group-item {
    padding: 8px 20px;
  }

  :host([readonly]) .awc-button-group-item {
    pointer-events: none;
    touch-action: none;
  }

  :host([disabled]) .awc-button-group-item {
    pointer-events: none;
    touch-action: none;
    opacity: 0.5;
  }

  .awc-button-group-item:focus,
  .awc-button-group-item:focus-visible {
    outline: none;
  }

  .awc-button-group-item:focus-visible,
  .awc-button-group-item.inner-last:focus-visible
  {
    border: 1px solid var(--colors-light-focus);
  }

  /* .awc-button-group-item:focus-visible::before {
    content: "";
    z-index: 1;
    position: absolute;
    inset: -3px;
    border: 3px solid #839ff633;
    pointer-events: none;
    border-radius: var(--corner-radius-s);
  } */

  .awc-button-group-item.first:focus-visible::before {
    border-radius: var(--corner-radius-l) 0 0 var(--corner-radius-l);
  }

  .awc-button-group-item.inner:focus-visible::before {
    border-radius: 0;
  }

  .awc-button-group-item.last:focus-visible::before {
    border-radius: 0 var(--corner-radius-l) var(--corner-radius-l) 0;
  }
`
var nc = Object.defineProperty,
  lc = Object.getOwnPropertyDescriptor,
  pr = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? lc(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && nc(e, r, o), o
  }
const Ki = 'awc-button-group-item'
let ve = class extends u {
  constructor() {
    super(...arguments), (this.expanded = !1), (this.readonly = !1), (this.disabled = !1)
  }
  render() {
    return l`
      <button
        ?readonly=${this.readonly}
        ?expanded=${this.expanded}
        ?disabled=${this.disabled}
        class="awc-button-group-item ${this.position}"
      >
        <slot></slot>
      </button>
    `
  }
}
ve.styles = [ac]
pr([n({ type: Boolean, reflect: !0 })], ve.prototype, 'expanded', 2)
pr([n({ type: Boolean, reflect: !0 })], ve.prototype, 'readonly', 2)
pr([n({ type: Boolean, reflect: !0 })], ve.prototype, 'disabled', 2)
pr([n({ type: String })], ve.prototype, 'position', 2)
ve = pr([f(Ki)], ve)
var cc = Object.defineProperty,
  dc = Object.getOwnPropertyDescriptor,
  Yi = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? dc(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && cc(e, r, o), o
  }
const pc = 'awc-button-group'
let Pr = class extends u {
  constructor() {
    super(...arguments), (this.disabled = !1)
  }
  get buttons() {
    return [...this.querySelectorAll(Ki)]
  }
  _checkInternalButtonGroup() {
    this.buttons && this.buttons.length && this._combiningButtons(this.buttons)
  }
  _combiningButtons(t) {
    if (!t || t.length === 0) return
    let e = -1
    t.forEach((r, i) => {
      i === 0
        ? (r.position = 'first')
        : i === t.length - 1
          ? (r.position = 'last')
          : ((r.position = 'inner'), (e = i))
    }),
      e !== -1 && (t[e].position = 'inner inner-last')
  }
  render() {
    return l`
      <div class="awc-button-group">
        <slot @slotchange="${this._checkInternalButtonGroup}"></slot>
      </div>
    `
  }
}
Pr.styles = [sc]
Yi([n({ type: Boolean, reflect: !0 })], Pr.prototype, 'disabled', 2)
Pr = Yi([f(pc)], Pr)
const hc = w`
    :host {
        display: block;

        --awc-accordion-item-box-shadow: inset 0 -1px 0 0 var(--colors-light-stroke);
    }

    button {
        margin: 0;
        padding: 0;
        border: none;
        background: none;
    }

    .awc-accordion-item {
        box-shadow: var(--awc-accordion-item-box-shadow);
    }

    .awc-accordion-item__button {
        position: relative;
        cursor: pointer;
        padding-right: 16px;
        min-block-size: 60px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font: var(--awc-font-headline-medium-16);
        color: var(--colors-light-titles);
    }

    .awc-accordion-item__button:focus-visible {
        outline: 1px solid var(--colors-light-focus);
        border-radius: var(--corner-radius-m);
    }

    /* .awc-accordion-item__button:focus-visible:before {
        content: "";
        position: absolute;
        border: 3px solid #839ff633;
        inset: -3px;
        border-radius: var(--corner-radius-l);
        pointer-events: none;
    } */

    .awc-accordion-item__arrow {
        transition: transform 0.2s ease-in-out;
    }

    :host([active]) .awc-accordion-item__arrow {
        transform: rotate(180deg);
    }

    :host([disabled]) .awc-accordion-item__button {
        opacity: 0.5;
        pointer-events: none;
        touch-action: none;
    }

    :host([disabled][active]) .awc-accordion-item__wrapper {
        opacity: 0.5;
        pointer-events: none;
        touch-action: none;
    }

    .awc-accordion-item__wrapper {
        display: grid;
        opacity: 0;
        grid-template-rows: 0fr;
        transition:
        padding 0.3s,
        opacity 0.3s,
        grid-template-rows 0.25s;
    }

    .awc-accordion-item__wrapper.active {
        opacity: 1;
        grid-template-rows: 1fr;
        padding: 0 0 16px 0;
    }

    .awc-accordion-item__content {
        overflow-y: hidden;
    }
`
var uc = Object.defineProperty,
  vc = Object.getOwnPropertyDescriptor,
  hr = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? vc(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && uc(e, r, o), o
  }
const Ji = 'awc-accordion-item'
let ge = class extends u {
  constructor() {
    super(...arguments), (this.active = !1), (this.disabled = !1)
  }
  _toggleActive() {
    this.disabled || ((this.active = !this.active), this._onActive(this.active))
  }
  render() {
    const t = Q`
            <svg class="awc-accordion-item__arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289Z" fill="#919BB6"/>
            </svg>
        `
    return l`
      <div class="awc-accordion-item">
        <button
          tabindex="0"
          @click=${this._toggleActive}
          class="awc-accordion-item__button"
          type="button"
        >
          ${this.title} ${t}
        </button>

        <section
          class="awc-accordion-item__wrapper ${this.active ? 'active' : ''}"
        >
          <div class="awc-accordion-item__content"><slot></slot></div>
        </section>
      </div>
    `
  }
}
ge.styles = [hc]
hr([n({ type: String, reflect: !0 })], ge.prototype, 'title', 2)
hr([n({ type: Boolean, reflect: !0 })], ge.prototype, 'active', 2)
hr([n({ type: Boolean, reflect: !0 })], ge.prototype, 'disabled', 2)
hr([P('awc-accordion-toggle')], ge.prototype, '_onActive', 2)
ge = hr([f(Ji)], ge)
const gc = w`
    :host{
        display: block;
    }

    :host([disabled]){
        opacity: .5;
        pointer-events: none;
        touch-action: none;
    }

`
var fc = Object.defineProperty,
  wc = Object.getOwnPropertyDescriptor,
  Co = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? wc(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && fc(e, r, o), o
  }
const bc = 'awc-accordion'
let Ye = class extends u {
  constructor() {
    super(...arguments), (this.disabled = !1), (this.autoclose = !1)
  }
  get accordionItems() {
    return [...this.querySelectorAll(Ji)]
  }
  _autocloseAccordionItem(t) {
    if (!this.autoclose) return
    const e = t.target
    ;(e.disabled && this.disabled) ||
      (e.active
        ? (this.accordionItems.forEach((r) => (r.active = !1)), (e.active = !0))
        : ((e.active = !0), e.active && (e.active = !1)))
  }
  _handleAccordionItem(t) {
    this._autocloseAccordionItem(t)
  }
  _shutdownAllAccordionItems() {
    this.disabled
      ? this.accordionItems.forEach((t) => (t.disabled = !0))
      : this.accordionItems.forEach((t) => (t.disabled = !1))
  }
  updated(t) {
    super.updated(t), t.has('disabled') && this._shutdownAllAccordionItems()
  }
  render() {
    return l`
      <div ?disabled=${this.disabled} class="awc-accordion">
        <slot @awc-accordion-toggle=${this._handleAccordionItem}></slot>
      </div>
    `
  }
}
Ye.styles = [gc]
Co([n({ type: Boolean, reflect: !0 })], Ye.prototype, 'disabled', 2)
Co([n({ type: Boolean, reflect: !0 })], Ye.prototype, 'autoclose', 2)
Ye = Co([f(bc)], Ye)
const _c = w`
  .awc-range-container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }
  /* Для WebKit (Chrome, Safari и др.) */
  .awc-range {
    width: 100%;
    height: 4px;
    -webkit-appearance: none;
    background-color: var(--colors-light-stroke);
    border-radius: 99px;
  }

  :host([disabled]) {
    opacity: 0.5;
    touch-action: none;
    pointer-events: none;
  }

  :host([disabled]) .awc-range::-webkit-slider-thumb {
    border: 4px solid #97a3b080;
  }

  :host([disabled]) .awc-range::-moz-range-thumb {
    background-color: var(--colors-light-white);
    border: 4px solid #97a3b080;
  }

  .awc-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    cursor: grab;
    border: 4px solid var(--colors-light-primary);
    transition: border 0.25s ease;
  }

  .awc-range::-webkit-slider-thumb:hover {
    border: 6px solid var(--colors-light-primary);
  }

  /* Для Firefox */
  .awc-range::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: var(--colors-light-white);
    cursor: grab;
    border: 4px  solid var(--colors-light-primary);
    transition: border 0.25s ease;
  }

  .awc-range::-moz-range-thumb:hover {
    border: 6px solid var(--colors-light-primary);
  }

  .awc-range::-moz-range-track {
    width: 100%;
    height: 4px;
    background-color: var(--colors-light-stroke);
    border-radius: 99px;
  }

  .awc-range__markers {
    position: relative;
    padding: 0;
    margin: 16px 0 16px 0;
    display: flex;
    align-items: center;
  }

  .awc-range-label {
    display: flex;
    align-items: center;
    gap: 4px;
    font: var(--awc-font-text-medium-14);
  }

  .awc-range-label__value {
    margin: 0;
    font: var(--awc-font-text-regular-14);
  }
`,
  mc = w`
    :host{
        display: inline-block;
        position: absolute;
        transform: translateX(calc(-50% + 10px));
    }

    .awc-range-item{
        cursor: pointer;
        list-style-type: none;
        padding: 0;
        margin: 0;
    }
    
    .awc-range-item__text{
        margin: 0;
        color: var(--colors-light-secondary);
        font: var(--awc-font-caption-2-regular);
        transition: color .3s ease;
    }

    .awc-range-item__text:hover{
        color: var(--colors-light-primary);
    }


    @media screen and (max-width: 768px){
        :host{
            transform: translateX(calc(-50% + 2px));
        }
    }
`
var yc = Object.defineProperty,
  xc = Object.getOwnPropertyDescriptor,
  Qi = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? xc(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && yc(e, r, o), o
  }
const ts = 'awc-range-item'
let Ar = class extends u {
  constructor() {
    super(...arguments), (this.value = '0')
  }
  render() {
    return l`
      <li value=${this.value} class="awc-range-item">
        <p class="awc-range-item__text"><slot></slot></p>
      </li>
    `
  }
}
Ar.styles = [mc]
Qi([n({ type: String, reflect: !0 })], Ar.prototype, 'value', 2)
Ar = Qi([f(ts)], Ar)
var Cc = Object.defineProperty,
  $c = Object.getOwnPropertyDescriptor,
  Tt = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? $c(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && Cc(e, r, o), o
  }
let _t = class extends kt(u) {
  constructor() {
    super(...arguments),
      (this.name = '0'),
      (this.value = '0'),
      (this.marker = !1),
      (this.min = 0),
      (this.max = 100),
      (this.step = 1)
  }
  get rangeItem() {
    return [...this.querySelectorAll(ts)]
  }
  updated(t) {
    super.updated(t),
      t.has('value') && this.setValue(this.value),
      t.has('marker') && this._setInputLabels()
  }
  _handleMarkers(t) {
    const e = t.target
    e &&
      ((this.value = e.value),
      this.dispatchEvent(new Event('change', { composed: !0, bubbles: !0 })))
  }
  _handleInputValue(t) {
    const e = t.target
    ;(this.value = e.value), this.dispatchEvent(new Event('input', { composed: !0, bubbles: !0 }))
  }
  _handleChangeValue(t) {
    const e = t.target
    ;(this.value = e.value), this.dispatchEvent(new Event('change', { composed: !0, bubbles: !0 }))
  }
  _setInputLabels() {
    const t = this._inputRange.getBoundingClientRect().width,
      e = parseFloat(this.value),
      r = this.rangeItem.length
    this.rangeItem.forEach((i, o) => {
      const s = parseFloat(i.value)
      let a = 0
      e >= this.min && e <= this.max
        ? (a = Math.round(((s - this.min) / (this.max - this.min)) * 100))
        : e < this.min
          ? (a = 0)
          : e > this.max && (a = 100)
      const d = (t / (r - 1)) * o,
        c = a - d / t
      i.style.left = `${c}%`
    })
  }
  connectedCallback() {
    super.connectedCallback(),
      requestAnimationFrame(() => {
        this._setInputLabels()
      })
  }
  render() {
    return l`
      <div class="awc-range-container">
        ${this.label ? l`<label class="awc-range-label">${this.label}: <p class="awc-range-label__value">${this.value}</p></label>` : ''}
        <input
          class="awc-range"
          type="range"
          name=${this.name}
          .value=${ir(this.value)}
          max=${this.max}
          min=${this.min}
          step=${this.step}
          ?marker=${this.marker}
          @input=${this._handleInputValue}
          @change=${this._handleChangeValue}
        />
        ${
          this.marker
            ? l`
              <ul class="awc-range__markers" @click=${this._handleMarkers}>
                <slot></slot>
              </ul>
            `
            : ''
        }
      </div>
    `
  }
}
_t.styles = [_c]
Tt([n({ type: String, reflect: !0 })], _t.prototype, 'name', 2)
Tt([n({ type: String, reflect: !0 })], _t.prototype, 'value', 2)
Tt([n({ type: String, reflect: !0 })], _t.prototype, 'label', 2)
Tt([n({ type: Boolean, reflect: !0 })], _t.prototype, 'marker', 2)
Tt([n({ type: Boolean, reflect: !0 })], _t.prototype, 'disabled', 2)
Tt([n({ type: Number, reflect: !0 })], _t.prototype, 'min', 2)
Tt([n({ type: Number, reflect: !0 })], _t.prototype, 'max', 2)
Tt([n({ type: Number, reflect: !0 })], _t.prototype, 'step', 2)
Tt([S('.awc-range')], _t.prototype, '_inputRange', 2)
_t = Tt([f('awc-range')], _t)
const kc = w`
    :host {
        display: inline-flex;
        width: 100%;
    }

    .awc-progress-bar {
        width: inherit;
        display: flex;
        flex-direction: column;
        gap: var(--spacing-s);
    }

    .awc-progress-bar__label {
        font: var(--awc-font-text-regular-14);
        color: var(--colors-light-text);
    }

    .awc-progress-bar__value {
        font: var(--awc-font-text-medium-14);
    }
    
    .awc-progress-bar__track {
        position: relative;
        width: inherit;
        height: 8px;
        overflow: hidden;
        border-radius: var(--corner-radius-s);
        background-color: var(--colors-light-stroke-hover);
    }
    
    .awc-progress-bar__filler {
        width: 0%;
        border-radius: var(--corner-radius-s);
        height: 100%;
        background-color: var(--colors-light-primary);
        transition: width 0.3s ease;
    }
`
var Oc = Object.defineProperty,
  Ec = Object.getOwnPropertyDescriptor,
  be = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? Ec(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && Oc(e, r, o), o
  }
const Sc = 'awc-progress-bar'
let Rt = class extends u {
  constructor() {
    super(...arguments),
      (this.value = 0),
      (this.max = 100),
      (this.label = ''),
      (this.hidePercent = !1)
  }
  _validateAndUpdateValues() {
    ;(isNaN(this.value) || this.value < 0) && (this.value = 0),
      (isNaN(this.max) || this.max < 0) && (this.max = 100),
      this.value > this.max && ((this.value = this.max), this._onSuccesEvent()),
      this._updateFillerWidth()
  }
  _updateFillerWidth() {
    const t = (this.value / this.max) * 100
    this.fillerElement && (this.fillerElement.style.width = `${t}%`)
  }
  _onSuccesEvent() {
    const t = { value: this.value, maxReached: !0 }
    this._onSucces(t), this._updateFillerWidth()
  }
  updated(t) {
    super.updated(t), (t.has('value') || t.has('max')) && this._validateAndUpdateValues()
  }
  render() {
    const t = this.hidePercent ? '' : '%'
    return l`
            <div 
            ?hide-percent=${this.hidePercent}
            class="awc-progress-bar">
                ${this.label ? l`<div class="awc-progress-bar__label">${this.label}: <span class="awc-progress-bar__value">${this.value}${t}</span></div>` : ''}
                <div class="awc-progress-bar__track">
                    <div class="awc-progress-bar__filler"></div>
                </div>
            </div>
        `
  }
}
Rt.styles = [kc]
be([n({ type: Number, reflect: !0 })], Rt.prototype, 'value', 2)
be([n({ type: Number, reflect: !0 })], Rt.prototype, 'max', 2)
be([n({ type: String, reflect: !0 })], Rt.prototype, 'label', 2)
be([n({ type: Boolean, reflect: !0, attribute: 'hide-percent' })], Rt.prototype, 'hidePercent', 2)
be([P('awc-progress-bar-success')], Rt.prototype, '_onSucces', 2)
be([S('.awc-progress-bar__filler')], Rt.prototype, 'fillerElement', 2)
Rt = be([f(Sc)], Rt)
const Pc = w`
    
    /* Large awc-empty-state */

    :host([size="large"]){
        display: flex;
        max-width: 700px;
    }

    :host([size="large"]) .awc-empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: var(--spacing-l);
    }

    :host([size="large"]) .awc-empty-state__main{
        font: var(--awc-font-text-regular-15);
        color: var(--colors-light-text);
    }

    :host([size="large"]) .awc-empty-state__title{
        margin: 0;
        margin-bottom: 12px;
        color: var(--colors-light-titles);
        font: var(--awc-font-h3-medium);
    }
    
    :host([size="large"]) .awc-empty-state__buttons{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: var(--spacing-l);
    }

    :host([size="large"]) .awc-empty-state__links {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: var(--spacing-l);
    }

    :host([size="large"]) .awc-empty-state__links ::slotted(awc-empty-state-link:not(:last-child))::after {
        content: "";
        display: flex;
        width: 3px;
        height: 3px;
        background-color: var(--colors-dark-secondary);
        border-radius: var(--corner-radius-circular);
    }

    /* Small awc-empty-state */

    :host([size="small"]){
        display: flex;
        max-width: 320px;
    }

    :host([size="small"]) .awc-empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: var(--spacing-s);
    }

    :host([size="small"]) .awc-empty-state__title {
        margin: 0;
        margin-bottom: 8px;
        color: var(--colors-light-titles);
        font: var(--awc-font-text-medium-15);
    }

    :host([size="small"]) .awc-empty-state__main {
        font: var(--awc-font-text-regular-15);
        color: var(--colors-dark-secondary);
    }

    :host([size="small"]) .awc-empty-state__buttons{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: var(--spacing-s);
    }

    :host([size="small"]) .awc-empty-state__links {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: var(--spacing-s);
    }

    @media screen and (max-width: 768px){
        .awc-empty-state__links ::slotted(awc-empty-state-link:not(:last-child))::after {
            display: none;
        }
    }
`
var Ac = Object.defineProperty,
  Lc = Object.getOwnPropertyDescriptor,
  $o = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? Lc(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && Ac(e, r, o), o
  }
const Bc = 'awc-empty-state'
let Je = class extends u {
  constructor() {
    super(...arguments), (this.size = 'large')
  }
  get icons() {
    return [...this.querySelectorAll(Mi)]
  }
  get buttons() {
    return [...this.querySelectorAll(Ii)]
  }
  _scalingIcon() {
    this.icons &&
      this.icons.forEach((t) => {
        this.size === 'large' ? (t.iconScale = '78px') : (t.iconScale = '48px')
      })
  }
  _setCurrentButtons() {
    this.buttons &&
      this.buttons.forEach((t) => {
        this.size === 'large' ? (t.size = 'large') : (t.size = 'regular'),
          (t.variant = 'primary'),
          (t.background = 'blue')
      })
  }
  updated(t) {
    super.updated(t), this._scalingIcon(), this._setCurrentButtons()
  }
  render() {
    return l`
      <div class="awc-empty-state">
        <div class="awc-empty-state__head">
          <slot @slotchange="${this._scalingIcon}" name="icon"></slot>
        </div>
        <div class="awc-empty-state__main">
          ${this.head ? l`<h3 class="awc-empty-state__title">${this.head}</h3>` : ''}
          <slot></slot>
        </div>
        <div class="awc-empty-state__buttons">
          <slot @slotchange="${this._setCurrentButtons}" name="button"></slot>
        </div>
        <div class="awc-empty-state__links">
          <slot name="link"></slot>
        </div>
      </div>
    `
  }
}
Je.styles = [Pc]
$o([n({ type: String, reflect: !0 })], Je.prototype, 'head', 2)
$o([n({ type: String, reflect: !0 })], Je.prototype, 'size', 2)
Je = $o([f(Bc)], Je)
const Ic = w`

    :host {
        display: inline-flex;
        align-items: center;
        gap: 20px;
    }
    
    .awc-empty-state-link {
        text-decoration: none;
        font: var(--awc-font-text-regular-15);
        color: var(--colors-light-primary);
        transition: color .3s ease;
        cursor: pointer;
    }

    .awc-empty-state-link:hover {
        color: var(--colors-light-link-hover);
    }
`
var Tc = Object.defineProperty,
  Dc = Object.getOwnPropertyDescriptor,
  ko = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? Dc(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && Tc(e, r, o), o
  }
const Mc = 'awc-empty-state-link'
let Qe = class extends u {
  constructor() {
    super(...arguments), (this.target = '_self')
  }
  render() {
    return this.href
      ? l`
    <a
      class="awc-empty-state-link"
      href=${this.href}
      target=${this.target}
      tabindex="0"
      >
        <slot></slot>
    </a>
    `
      : l`
    <div
      class="awc-empty-state-link"
      href=${this.href}
      target=${this.target}
      tabindex="0"
      >
        <slot></slot>
    </div>
    `
  }
}
Qe.styles = [Ic]
ko([n({ type: String, reflect: !0 })], Qe.prototype, 'href', 2)
ko([n({ type: String, reflect: !0 })], Qe.prototype, 'target', 2)
Qe = ko([f(Mc)], Qe)
const jc = w`
    :host {
        display: inline-flex;
    }

    .awc-tag {
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: center;
        transition: background-color .3s ease;
    }

    .awc-tag__text {
        margin: 0;
        transition: color .3s ease;
    }

    :host([variant="square"]) .awc-tag {
        padding: 6px 9px;
        border-radius: var(--corner-radius-m);
        background-color: var(--awc-tag-color);
    }

    :host([variant="square"]) .awc-tag__text {
        font: var(--awc-font-caption-1-regular);
        color: var(--awc-tag-text-color);
    }

    :host([variant="circle"]) .awc-tag {
        position: relative;
        overflow: hidden;
        padding: 5px 10px;
        border-radius: var(--corner-radius-circular);
    }

    :host([variant="circle"]) .awc-tag::before{
        content: "";
        position: absolute;
        inset: 0px;
        opacity: 0.1;
        background-color: var(--awc-tag-color);
    }

    :host([variant="circle"]) .awc-tag__text {
        font: var(--awc-font-caption-2-regular);
        color: var(--awc-tag-color);
    }

    :host([variant="bullet"]) .awc-tag {
        position: relative;
        overflow: hidden;
        padding: 3px 7px;
        border-radius: var(--corner-radius-2xl) var(--corner-radius-circular)
        var(--corner-radius-circular) var(--corner-radius-2xl);
    }

    :host([variant="bullet"]) .awc-tag::before{
        content: "";
        position: absolute;
        inset: 0px;
        opacity: 0.2;
        background-color: var(--awc-tag-color);
    }

    :host([variant="bullet"]) .awc-tag__text {
        font: var(--awc-font-caption-2-regular);
        color: var(--colors-light-dark-blue);
    }

`
var zc = Object.defineProperty,
  Rc = Object.getOwnPropertyDescriptor,
  Rr = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? Rc(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && zc(e, r, o), o
  }
const Fc = 'awc-tag'
let Ae = class extends u {
  constructor() {
    super(...arguments), (this.baseColor = 'colors-light-secondary'), (this.variant = 'square')
  }
  pickTextColorBasedOnBgColor(t, e, r) {
    if (t) {
      let i = t.charAt(0) === '#' ? t.substring(1, 7) : t
      const o = parseInt(i.substring(0, 2), 16),
        s = parseInt(i.substring(2, 4), 16),
        a = parseInt(i.substring(4, 6), 16)
      return o * 0.299 + s * 0.587 + a * 0.114 > 186 ? r : e
    }
  }
  render() {
    const t =
        this.variant === 'square'
          ? this.pickTextColorBasedOnBgColor(
              this.customColor,
              '--awc-tag-text-color: #FFFFFF',
              '--awc-tag-text-color: #55555A'
            )
          : '',
      e = this.customColor ? this.customColor : `var(--${this.baseColor})`
    return l`
      <div class="awc-tag" style="--awc-tag-color: ${e}">
        <p class="awc-tag__text" style=${t}><slot></slot></p>
      </div>
    `
  }
}
Ae.styles = [jc]
Rr([n({ type: String, reflect: !0, attribute: 'custom-color' })], Ae.prototype, 'customColor', 2)
Rr([n({ type: String, reflect: !0, attribute: 'base-color' })], Ae.prototype, 'baseColor', 2)
Rr([n({ type: String, reflect: !0 })], Ae.prototype, 'variant', 2)
Ae = Rr([f(Fc)], Ae)
const Vc = w`
    :host {
        display: inline-flex;
    }

    .awc-color-picker {
        padding: 16px;
        max-width: 100%;
        display: flex;
        flex-direction: column;
        border-radius: var(--corner-radius-s);
        background-color: var(--colors-light-white);
        box-shadow: 0px 0px 20px 5px rgba(64, 72, 98, 0.2);
        max-height: 264px;
    }

    .awc-color-pciker__header ::slotted(awc-tabs-group) {
        padding-bottom: var(--spacing-m);
    }

    .awc-color-picker__tabs {
        position: relative;
    }

    .awc-color-picker__reset {
        display: inline-flex;
        position: absolute;
        top: 30%;
        right: 0;
        cursor: pointer;
    }

    .awc-color-picker__main {
        min-width: 232px;
    }

    .awc-color-picker__view {
        display: none;
    }

    .awc-color-picker__view--active {
        display: block;
    }

    .awc-color-picker__palete {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: var(--spacing-s);
    }

    .awc-color-picker__color {
        cursor: pointer;
        width: 32px;
        height: 32px;
        border-radius: var(--corner-radius-m);
        transition: transform 0.2s ease-out;
        will-change: transform;
    }

    .awc-color-picker__color:hover {
        transition: transform 0.2s ease-in;
        transform: scale3d(1.05, 1.05, 1.05);
    }

    .awc-color-picker__color.active-color {
        background-position: center;
        background-repeat: no-repeat;
        background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M14.7071 3.29289C15.0976 3.68342 15.0976 4.31658 14.7071 4.70711L6.70711 12.7071C6.31658 13.0976 5.68342 13.0976 5.29289 12.7071L1.29289 8.70711C0.902369 8.31658 0.902369 7.68342 1.29289 7.29289C1.68342 6.90237 2.31658 6.90237 2.70711 7.29289L6 10.5858L13.2929 3.29289C13.6834 2.90237 14.3166 2.90237 14.7071 3.29289Z' fill='white'/%3E%3C/svg%3E%0A");
    }

    .awc-color-picker__input {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        padding: 0;
        width: 100%;
        height: 32px;
        background-color: transparent;
        border: none;
        cursor: pointer;
    }

    .awc-color-picker__input::-webkit-color-swatch {
        border-radius: var(--corner-radius-s);
        border: none;
    }

    .awc-color-picker__input::-moz-color-swatch {
        border-radius: var(--corner-radius-s);
        border: none;
    }
`
var qc = Object.defineProperty,
  Hc = Object.getOwnPropertyDescriptor,
  Dt = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? Hc(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && qc(e, r, o), o
  }
const Uc = 'awc-color-picker'
let mt = class extends kt(u) {
  constructor() {
    super(...arguments),
      (this.reset = !1),
      (this.BASE_PALETTE_COLORS = [
        '#ED3A3A',
        '#F74F4F',
        '#FB7C28',
        '#F8AF28',
        '#FED34A',
        '#81D83C',
        '#5FB829',
        '#1EA679',
        '#35D3AC',
        '#44CADA',
        '#2FB9CE',
        '#52ACF5',
        '#2A8CE3',
        '#3761E9',
        '#5D7EF7',
        '#8360F4',
        '#704AE5',
        '#AC3EC7',
        '#C764DF',
        '#E44662',
        '#FF7188',
        '#919BB6',
        '#55555A',
        '#26263E'
      ]),
      (this.activeTab = 0)
  }
  get tabs() {
    return [...this.querySelectorAll(no)]
  }
  _triggerChangeEvent(t) {
    this.dispatchEvent(new Event('change', { bubbles: !0, composed: !0 }))
  }
  _handleColorSelection(t) {
    const e = t.target
    if (!e) return
    this.colorItems.forEach((i) => i.classList.remove('active-color')),
      e.classList.add('active-color')
    const r = e.getAttribute('value')
    r &&
      ((this.value = r.toLowerCase()), this._triggerChangeEvent(t), this._onChangeColor(this.value))
  }
  _setCustomColorValue(t) {
    this.value = this._inputColor.value
  }
  _setDefaultColorInBasePalette() {
    this.colorItems.forEach((t) => t.classList.remove('active-color')),
      this.BASE_PALETTE_COLORS.forEach((t) => {
        this.value &&
          t === this.value.toUpperCase() &&
          this.colorItems.forEach((e) => {
            e.getAttribute('value') === t && e.classList.add('active-color')
          })
      })
  }
  _checkAssignedAwcTabs() {
    let t = -1
    this.tabs.forEach((e, r) => {
      e.active && (t = r),
        e.addEventListener('click', () => {
          this.activeTab = r
        }),
        e.addEventListener('change', (i) => i.stopPropagation())
    }),
      t === -1
        ? (this.tabs[0] && (this.tabs[0].active = !0), (this.activeTab = 0))
        : (this.activeTab = t),
      this._checkAwcTabsLength(),
      this.requestUpdate()
  }
  _checkAwcTabsLength() {
    this.tabs.length > 2 && console.warn('Maximum number of tabs exceeded')
  }
  _resetColorPicker() {
    ;(this._inputColor.value = '#000000'),
      (this.value = ''),
      this.dispatchEvent(new Event('change', { bubbles: !0, composed: !0 })),
      this.colorItems.forEach((t) => t.classList.remove('active-color'))
  }
  updated(t) {
    super.updated(t),
      t.has('value') && this.setValue(this.value),
      this._setDefaultColorInBasePalette()
  }
  render() {
    const t = l`
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_29752_259031)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9 3C6.23858 3 4 5.23858 4 8V9C4 9.40446 3.75636 9.7691 3.38268 9.92388C3.00901 10.0787 2.57889 9.9931 2.29289 9.70711L0.292893 7.70711C-0.0976311 7.31658 -0.0976311 6.68342 0.292893 6.29289C0.683418 5.90237 1.31658 5.90237 1.70711 6.29289L2.0633 6.64909C2.09212 6.5722 2.13014 6.4998 2.17601 6.43323C2.8875 3.32155 5.67264 1 9 1C12.866 1 16 4.13401 16 8C16 11.866 12.866 15 9 15C7.36709 15 5.86228 14.4396 4.67131 13.5014C4.23746 13.1597 4.16282 12.5309 4.50458 12.0971C4.84634 11.6633 5.47509 11.5886 5.90893 11.9304C6.75982 12.6007 7.83189 13 9 13C11.7614 13 14 10.7614 14 8C14 5.23858 11.7614 3 9 3ZM9 9C9.55229 9 10 8.55228 10 8C10 7.44772 9.55229 7 9 7C8.44771 7 8 7.44772 8 8C8 8.55228 8.44771 9 9 9Z"
            fill="#919BB6"
          />
        </g>
        <defs>
          <clipPath id="clip0_29752_259031">
            <rect width="16" height="16" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `
    return l`
      <div class="awc-color-picker">
        <div class="awc-color-pciker__header">
          <div class="awc-color-picker__tabs">
            <slot @slotchange=${this._checkAssignedAwcTabs}></slot>
            ${
              this.reset && this._slot && this._slot.assignedElements().length
                ? l`
                  <div
                    @click=${this._resetColorPicker}
                    class="awc-color-picker__reset"
                  >
                    ${t}
                  </div>
                `
                : ''
            }
          </div>
        </div>
        <div class="awc-color-picker__main">
          <div
            class="awc-color-picker__view ${this.activeTab === 0 ? 'awc-color-picker__view--active' : ''}"
          >
            <div
              class="awc-color-picker__palete"
              @change=${this._triggerChangeEvent}
            >
              ${this.BASE_PALETTE_COLORS.map(
                (e) => l`
                  <div
                    @click=${this._handleColorSelection}
                    value=${e}
                    class="awc-color-picker__color"
                    style="background-color: ${e}"
                  ></div>
                `
              )}
            </div>
          </div>
          <div
            class="awc-color-picker__view ${this.activeTab === 1 ? 'awc-color-picker__view--active' : ''}"
          >
            <input
              class="awc-color-picker__input"
              type="color"
              @change=${this._triggerChangeEvent}
              @input=${this._setCustomColorValue}
              name=${this.name}
            />
          </div>
        </div>
      </div>
    `
  }
}
mt.styles = [Vc]
Dt([n({ type: String, reflect: !0 })], mt.prototype, 'name', 2)
Dt([n({ type: String, reflect: !0 })], mt.prototype, 'value', 2)
Dt([n({ type: Boolean, reflect: !0 })], mt.prototype, 'reset', 2)
Dt([n({ type: Array })], mt.prototype, 'BASE_PALETTE_COLORS', 2)
Dt([Y()], mt.prototype, 'activeTab', 2)
Dt([gi('.awc-color-picker__color')], mt.prototype, 'colorItems', 2)
Dt([S('input')], mt.prototype, '_inputColor', 2)
Dt([S('slot')], mt.prototype, '_slot', 2)
Dt([P('awc-color-picker-change')], mt.prototype, '_onChangeColor', 2)
mt = Dt([f(Uc)], mt)
const Nc = w`
    :host {
        display: block;
    }

    .awc-notifier__wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 14px 20px;
        min-height: calc(64px - 28px);
        background-color: var(--colors-light-success);
    }

    .awc-notifier__main {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: inherit;
        gap: 40px;
        font: var(--awc-font-text-regular-14);
        color: var(--colors-light-white);
    }

    .awc-notifier__button {
        cursor: pointer;
        padding: 0;
        background: none;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .awc-notifier__icon {
        fill: var(--colors-light-white);
    }

    .awc-notifier__button:focus-visible {
        outline: 1px solid var(--colors-light-focus);
        border-radius: var(--corner-radius-s);
    }

    .awc-notifier__button .awc-notifier__icon {
        transition: opacity 0.3s ease;
    }

    .awc-notifier__button:hover .awc-notifier__icon,
    .awc-notifier__button:active .awc-notifier__icon {
        opacity: 0.7;
    }
`
var Wc = Object.defineProperty,
  Gc = Object.getOwnPropertyDescriptor,
  Zc = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? Gc(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && Wc(e, r, o), o
  }
const Xc = 'awc-notifier'
let ro = class extends u {
  _onChange(t) {
    t.target && this.dispatchEvent(new Event('change', { composed: !0, bubbles: !0 }))
  }
  render() {
    const t = l`
            <svg class="awc-notifier__icon" width="24" height="24" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.70711 7.29289C8.31658 6.90237 7.68342 6.90237 7.29289 7.29289C6.90237 7.68342 6.90237 8.31658 7.29289 8.70711L10.5858 12L7.29295 15.2929C6.90243 15.6834 6.90243 16.3166 7.29295 16.7071C7.68348 17.0976 8.31664 17.0976 8.70717 16.7071L12 13.4142L15.2929 16.7071C15.6834 17.0976 16.3166 17.0976 16.7071 16.7071C17.0976 16.3166 17.0976 15.6834 16.7071 15.2929L13.4142 12L16.7072 8.70711C17.0977 8.31658 17.0977 7.68342 16.7072 7.29289C16.3166 6.90237 15.6835 6.90237 15.293 7.29289L12 10.5858L8.70711 7.29289Z"/>
            </svg>
        `
    return l`
            <div class="awc-notifier">
                <div class="awc-notifier__wrapper">
                    <div class="awc-notifier__main">
                        <slot></slot>
                        <slot name="button"></slot>
                    </div>
                    <button @click=${this._onChange} class="awc-notifier__button" type="button">
                        ${t}
                    </button>
                </div>
            </div>
       `
  }
}
ro.styles = [Nc]
ro = Zc([f(Xc)], ro)
const Kc = w`
    :host {
        display: flex;
    }

    p {
        margin: 0;
    }

    a {
        text-decoration: none;
    }

    .awc-card {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 20px;
        border-radius: var(--corner-radius-l);
        background-color: var(--colors-light-white);
        border: 1px solid var(--colors-light-stroke);
        transition:
        border 0.3s ease,
        box-shadow 0.3s ease;
    }

    .awc-card:hover {
        border: 1px solid transparent;
        box-shadow: 0px 5px 20px 0px #4048621a;
    }

    .awc-card:focus-visible {
        outline: none;
        border: 1px solid var(--colors-light-secondary);
        box-shadow: 0px 5px 20px 0px #4048621a;
    }

    .awc-card__head {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }

    .awc-card__icon {
        position: relative;
        padding: 12px;
        z-index: 1;
    }

    .awc-card__icon::before {
        content: "";
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: var(--corner-radius-circular);
        background-color: var(--awc-card-color);
        opacity: 0.1;
        z-index: -1;
    }

    .awc-card__icon ::slotted(awc-icon[type="icon"]) {
        fill: var(--awc-card-color);
    }

    .awc-card__icon.awc-card__icon--module::before {
        background-color: var(--colors-light-input-background);
        opacity: 1;
    }

    .awc-card__main {
        margin-top: var(--spacing-sm);
        display: flex;
        flex-direction: column;
        gap: 4px;
        word-wrap: break-word;
        text-align: start;
    }

    .awc-card__title {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        font: var(--awc-font-text-medium-14);
        color: var(--colors-light-titles);
    }

    .awc-card__subtitle {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        font: var(--awc-font-caption-1-regular);
        color: var(--colors-light-secondary);
    }

    .awc-card__footer {
        padding-right: 15px;
    }
`
var Yc = Object.defineProperty,
  Jc = Object.getOwnPropertyDescriptor,
  qt = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? Jc(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && Yc(e, r, o), o
  }
const Qc = 'awc-card'
let $t = class extends u {
  constructor() {
    super(...arguments), (this.target = '_self'), (this.arrow = !1), (this._isModuleIcon = !1)
  }
  _changeBackgroundIconModule() {
    this._iconSlot.assignedElements().filter((r) => r.type === 'module').length
      ? (this._isModuleIcon = !0)
      : (this._isModuleIcon = !1)
  }
  render() {
    const t = Q`
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.29289 6.29289C8.90237 6.68342 8.90237 7.31658 9.29289 7.70711L13.5858 12L9.29289 16.2929C8.90237 16.6834 8.90237 17.3166 9.29289 17.7071C9.68342 18.0976 10.3166 18.0976 10.7071 17.7071L15.7071 12.7071C16.0976 12.3166 16.0976 11.6834 15.7071 11.2929L10.7071 6.29289C10.3166 5.90237 9.68342 5.90237 9.29289 6.29289Z" fill="#919BB6"/>
            </svg>
        `
    return l`
            ${
              this.href
                ? l`
                <a class="awc-card"
                    href=${this.href}
                    target=${this.target}
                >
                    <div class="awc-card__head">
                        <div class="awc-card__icon ${this._isModuleIcon ? 'awc-card__icon--module' : ''}" style=${`--awc-card-color: ${this.iconColor}`}>
                            <slot @slotchange=${this._changeBackgroundIconModule} name="icon"></slot>
                        </div>
                        <div class="awc-card__additional">
                            <slot name="toolbar"></slot>
                            ${this.arrow ? t : ''}    
                        </div>    
                    </div>
                    <div class="awc-card__main">
                        ${this.title ? l`<p class="awc-card__title">${this.title}</p>` : ''}
                        ${this.subtitle ? l`<p class="awc-card__subtitle">${this.subtitle}</p>` : ''}
                    </div>
                    <div class="awc-card__footer">
                        <slot></slot>
                    </div>
                </a>
                `
                : l`
                    <div class="awc-card" tabIndex="0">
                        <div class="awc-card__head">
                            <div class="awc-card__icon ${this._isModuleIcon ? 'awc-card__icon--module' : ''}" style=${`--awc-card-color: ${this.iconColor}`}>
                                <slot @slotchange=${this._changeBackgroundIconModule} name="icon"></slot>
                            </div>
                            <div class="awc-card__additional">
                                <slot name="toolbar"></slot>
                                ${this.arrow ? t : ''}    
                            </div>
                        </div>
                        <div class="awc-card__main">
                            ${this.title ? l`<p class="awc-card__title">${this.title}</p>` : ''}
                            ${this.subtitle ? l`<p class="awc-card__subtitle">${this.subtitle}</p>` : ''}
                        </div>
                        <div class="awc-card__footer">
                            <slot></slot>
                        </div>
                </div>
            `
            }
        `
  }
}
$t.styles = [Kc]
qt([n({ type: String, reflect: !0 })], $t.prototype, 'title', 2)
qt([n({ type: String, reflect: !0 })], $t.prototype, 'subtitle', 2)
qt([n({ type: String, reflect: !0 })], $t.prototype, 'href', 2)
qt([n({ type: String })], $t.prototype, 'target', 2)
qt([n({ type: String, reflect: !0, attribute: 'icon-color' })], $t.prototype, 'iconColor', 2)
qt([n({ type: Boolean, reflect: !0 })], $t.prototype, 'arrow', 2)
qt([S("slot[name='icon']")], $t.prototype, '_iconSlot', 2)
qt([Y()], $t.prototype, '_isModuleIcon', 2)
$t = qt([f(Qc)], $t)
const td = w`
    :host {
        display: block;
        position: relative;
        --color: var(--colors-light-input-background);
        --border-radius-rounded: var(--corner-radius-circular);
        --border-radius-8: var(--corner-radius-l);
        --border-radius-12: var(--corner-radius-xl);
        --sheen-color: hsl(240 4.9% 98.5%);
    }

    .awc-skeleton {
        display: flex;
        width: 100%;
        height: 100%;
        min-height: 1rem;
    }

    .awc-skeleton__indicator {
        flex: 1 1 auto;
        background-color: var(--color);
    }

    :host([rounded="8"]) .awc-skeleton__indicator {
        border-radius: var(--border-radius-8);
    }

    :host([rounded="12"]) .awc-skeleton__indicator {
        border-radius: var(--border-radius-12);
    }

    :host([rounded="rounded"]) .awc-skeleton__indicator {
        border-radius: var(--border-radius-rounded);
    }

    :host([effect="none"]) .awc-skeleton__indicator {
        animation: none;
    }

    :host([effect="pulse"]) .awc-skeleton__indicator {
        animation: pulse 2s ease-in-out 0.5s infinite;
    }

    @keyframes pulse {
        0% {
        opacity: 1;
        }
        50% {
        opacity: 0.5;
        }
        100% {
        opacity: 1;
        }
    }

    :host([effect="sheen"]) .awc-skeleton__indicator {
        background: linear-gradient(
        270deg,
        var(--sheen-color),
        var(--color),
        var(--color),
        var(--sheen-color)
        );
        background-size: 400% 100%;
        animation: sheen 7s ease-in-out infinite;
    }

    @keyframes sheen {
        from {
        background-position: 200% 0;
        }
        to {
        background-position: -200% 0;
        }
    }
`
var ed = Object.defineProperty,
  rd = Object.getOwnPropertyDescriptor,
  Oo = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? rd(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && ed(e, r, o), o
  }
const od = 'awc-skeleton'
let tr = class extends u {
  constructor() {
    super(...arguments), (this.effect = 'pulse'), (this.rounded = 'rounded')
  }
  render() {
    return l`
            <div class="awc-skeleton">
                <div class="awc-skeleton__indicator"></div>
            </div>
        `
  }
}
tr.styles = [td]
Oo([n({ type: String, reflect: !0 })], tr.prototype, 'effect', 2)
Oo([n({ type: String, reflect: !0 })], tr.prototype, 'rounded', 2)
tr = Oo([f(od)], tr)
const id = w`
    :host {
        display: inline-flex;
    }

    ul {
        list-style-type: none;
    }

    ul,
    li {
        padding: 0;
        margin: 0;
    }

    .awc-pagination {
        display: inline-flex;
        gap: var(--spacing-s);
    }

    .awc-pagination__list {
        display: flex;
        gap: var(--spacing-s);
        align-items: center;
    }

    .awc-pagination__item {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        cursor: pointer;
        position: relative;
        overflow-wrap: break-word;
        white-space: nowrap;
        outline: 0;
        height: 36px;
        width: 36px;
        font: var(--awc-font-text-medium-14);
        color: var(--colors-light-titles);
        border-radius: var(--corner-radius-s);
        transition:
        color 0.3s,
        background-color 0.3s ease-out;
    }

    .awc-pagination__item.active {
        background-color: var(--colors-light-primary);
        color: var(--colors-light-white);
    }

    .awc-pagination__item:not(.active):focus-visible {
        background-color: var(--colors-light-input-background);
    }

    .awc-pagination__item:focus-visible,
    .awc-pagination__button:focus-visible {
        outline: 1px solid var(--colors-light-secondary);
        outline-offset: 1px;
    }

    .awc-pagination__item:not(.active):hover {
        transition:
        color 0.3s,
        background-color 0.3s ease-in;
        background-color: var(--colors-light-input-background);
    }

    .awc-pagination__button {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        height: 36px;
        width: 36px;
        cursor: pointer;
        border-radius: var(--corner-radius-s);
        transition: background-color 0.3s ease-out;
    }

    .awc-pagination__button:hover {
        transition: background-color 0.3s ease-in;
        background-color: var(--colors-light-input-background);
    }

    .ellipsis {
        cursor: default;
        pointer-events: none;
    }

    .ellipsis::after {
        content: "...";
        color: var(--colors-light-secondary);
    }
`
var sd = Object.defineProperty,
  ad = Object.getOwnPropertyDescriptor,
  Be = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? ad(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && sd(e, r, o), o
  }
const nd = 'awc-pagination'
let Xt = class extends u {
  constructor() {
    super(...arguments),
      (this._activePage = 1),
      (this._itemsPerPage = 1),
      (this._totalItemsCount = 1),
      (this.first = !1),
      (this.last = !1),
      (this._maxVisibleItems = 5),
      (this._ellipsisVisible = !1)
  }
  get activePage() {
    return this._activePage
  }
  set activePage(t) {
    const e = Math.ceil(this._totalItemsCount / this._itemsPerPage),
      r = Math.min(Math.max(1, t || 1), e),
      i = this._activePage
    r !== i && ((this._activePage = r), this.requestUpdate('activePage', i))
  }
  get itemsPerPage() {
    return this._itemsPerPage
  }
  set itemsPerPage(t) {
    const e = Math.max(1, t || 1),
      r = this._itemsPerPage
    e !== r && ((this._itemsPerPage = e), this.requestUpdate('itemsPerPage', r))
  }
  get totalItemsCount() {
    return this._totalItemsCount
  }
  set totalItemsCount(t) {
    const e = Math.max(1, t || 1),
      r = this._totalItemsCount
    e !== r && ((this._totalItemsCount = e), this.requestUpdate('totalItemsCount', r))
  }
  _generatePages(t) {
    const e = [],
      r = Math.floor(this._maxVisibleItems / 2)
    let i = Math.max(1, this.activePage - r),
      o = Math.min(t, this.activePage + r)
    this.activePage <= r
      ? (o = Math.min(t, this._maxVisibleItems))
      : this.activePage > t - r && (i = Math.max(1, t - this._maxVisibleItems + 1)),
      t === o &&
        this._maxVisibleItems !== t &&
        (t && o && i) !== 1 &&
        (e.push(1), e.push('...'), (this._ellipsisVisible = !0))
    for (let s = i; s <= o; s++) e.push(s)
    return (
      this._maxVisibleItems === o &&
        this._maxVisibleItems !== t &&
        ((this._ellipsisVisible = !0), e.push('...'), e.push(t)),
      e
    )
  }
  _nextPage() {
    const t = Math.ceil(this.totalItemsCount / this.itemsPerPage)
    this.activePage < t && this.activePage++, this._onChange()
  }
  _previousPage() {
    this.activePage > 1 && this.activePage--, this._onChange()
  }
  _onPageClick(t) {
    ;(typeof t == 'number' && t === this.activePage) ||
      (typeof t == 'number' && ((this.activePage = t), this._onChange()))
  }
  _handleKeydown(t) {
    var e
    if (t.key === 'Enter' || t.key === ' ') {
      const r = (e = this.shadowRoot) == null ? void 0 : e.activeElement
      if (r != null && r.classList.contains('awc-pagination__button--prev')) this._previousPage()
      else if (r != null && r.classList.contains('awc-pagination__button--next')) this._nextPage()
      else if (r != null && r.classList.contains('awc-pagination__button--first')) this._firstPage()
      else if (r != null && r.classList.contains('awc-pagination__button--last')) this._lastPage()
      else {
        const i = parseInt(r.textContent, 10)
        this._onPageClick(i)
      }
      this._onChange()
    }
  }
  _firstPage() {
    ;(this.activePage = 1), this._onChange()
  }
  _lastPage() {
    const t = Math.ceil(this.totalItemsCount / this.itemsPerPage)
    ;(this.activePage = t), this._onChange()
  }
  _onChange() {
    this.dispatchEvent(new Event('change', { composed: !0, bubbles: !0 }))
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener('keydown', this._handleKeydown)
  }
  disconnectedCallback() {
    this.removeEventListener('keydown', this._handleKeydown), super.disconnectedCallback()
  }
  render() {
    const t = Math.ceil(this.totalItemsCount / this.itemsPerPage),
      e = this._generatePages(t),
      r = l`
            <span role="button" @keydown=${this._handleKeydown} @click=${this._previousPage} tabIndex="0" class="awc-pagination__button awc-pagination__button--prev">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7071 6.29289C15.0976 6.68342 15.0976 7.31658 14.7071 7.70711L10.4142 12L14.7071 16.2929C15.0976 16.6834 15.0976 17.3166 14.7071 17.7071C14.3166 18.0976 13.6834 18.0976 13.2929 17.7071L8.29289 12.7071C7.90237 12.3166 7.90237 11.6834 8.29289 11.2929L13.2929 6.29289C13.6834 5.90237 14.3166 5.90237 14.7071 6.29289Z" fill="#919BB6"/>
                </svg>
            </span>
        `,
      i = l`
            <span role="button" @keydown=${this._handleKeydown} @click=${this._nextPage} tabIndex="0" class="awc-pagination__button awc-pagination__button--next">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.29289 6.29289C8.90237 6.68342 8.90237 7.31658 9.29289 7.70711L13.5858 12L9.29289 16.2929C8.90237 16.6834 8.90237 17.3166 9.29289 17.7071C9.68342 18.0976 10.3166 18.0976 10.7071 17.7071L15.7071 12.7071C16.0976 12.3166 16.0976 11.6834 15.7071 11.2929L10.7071 6.29289C10.3166 5.90237 9.68342 5.90237 9.29289 6.29289Z" fill="#919BB6"/>
                </svg>
            </span>
        `,
      o = l`
            <span role="button" @click=${this._firstPage} @keydown=${this._handleKeydown} tabIndex="0" class="awc-pagination__button awc-pagination__button--first">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.7071 16.2929C17.0976 16.6834 17.0976 17.3166 16.7071 17.7071C16.3166 18.0976 15.6834 18.0976 15.2929 17.7071L10.2929 12.7071C10.1054 12.5196 10 12.2652 10 12C10 11.7348 10.1054 11.4804 10.2929 11.2929L15.2929 6.29289C15.6834 5.90237 16.3166 5.90237 16.7071 6.29289C17.0976 6.68342 17.0976 7.31658 16.7071 7.70711L12.4142 12L16.7071 16.2929ZM8.00004 17C8.00004 17.5523 7.55232 18 7.00004 18C6.44775 18 6.00004 17.5523 6.00004 17V7C6.00004 6.44772 6.44775 6 7.00004 6C7.55232 6 8.00004 6.44772 8.00004 7V17Z" fill="#919BB6"/>
                </svg>
            </span>
        `,
      s = l`
            <span role="button" @click=${this._lastPage} tabIndex="0" class="awc-pagination__button awc-pagination__button--last">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.29293 16.2929C6.90241 16.6834 6.90241 17.3166 7.29293 17.7071C7.68345 18.0976 8.31662 18.0976 8.70714 17.7071L13.7071 12.7071C13.8947 12.5196 14 12.2652 14 12C14 11.7348 13.8947 11.4804 13.7071 11.2929L8.70714 6.29289C8.31662 5.90237 7.68345 5.90237 7.29293 6.29289C6.90241 6.68342 6.90241 7.31658 7.29293 7.70711L11.5858 12L7.29293 16.2929ZM16 17C16 17.5523 16.4477 18 17 18C17.5523 18 18 17.5523 18 17V7C18 6.44771 17.5523 6 17 6C16.4477 6 16 6.44771 16 7V17Z" fill="#919BB6"/>
                </svg>
            </span>
        `
    return l`
            <nav class="awc-pagination" aria-label="Pagination">
                ${this.first ? o : ''}
                ${this.activePage > 1 ? r : ''}
            
                <ul class="awc-pagination__list">
                    ${e.map(
                      (a) => l`
                        <li>
                            <span 
                                class="awc-pagination__item ${a === this.activePage ? 'active' : ''}"
                                tabIndex="0" 
                                role="button"
                                aria-label="Page ${a}"
                                @click=${() => this._onPageClick(a)}
                            >${a}</span>
                        </li>
                    `
                    )}
                </ul>

                ${this.activePage < t ? i : ''}
                ${this.last ? s : ''}
            </nav>
        `
  }
}
Xt.styles = [id]
Be([n({ type: Number, reflect: !0, attribute: 'active-page' })], Xt.prototype, 'activePage', 1)
Be([n({ type: Number, reflect: !0, attribute: 'items-per-page' })], Xt.prototype, 'itemsPerPage', 1)
Be(
  [n({ type: Number, reflect: !0, attribute: 'total-items-count' })],
  Xt.prototype,
  'totalItemsCount',
  1
)
Be([n({ type: Boolean, reflect: !0 })], Xt.prototype, 'first', 2)
Be([n({ type: Boolean, reflect: !0 })], Xt.prototype, 'last', 2)
Xt = Be([f(nd)], Xt)
const ld = w`

    :host{
        display: inline-flex;
        width: 100%;
        max-width: 100%;
    }

    .awc-header {
        padding: 0 24px;
        background: var(--colors-light-white);
        background-size: 100% 100%;
        display: flex;
        flex-direction: column;
        width: 100%;
        border-bottom: 1px solid var(--colors-light-stroke);
    }

    .awc-header__main {
        padding: 16px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .awc-header__toolbar{
        display: flex;
        align-items: center;
    }

    .awc-header__tab{
        display: block;
        width: 100%;
    }
`
var cd = Object.defineProperty,
  dd = Object.getOwnPropertyDescriptor,
  pd = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? dd(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && cd(e, r, o), o
  }
const hd = 'awc-header'
let oo = class extends u {
  render() {
    return l`
            <section class="awc-header">
                <div class="awc-header__main">
                    <div class="awc-header__content"><slot></slot></div>
                    <div class="awc-header__toolbar">
                        <slot name="toolbar"></slot>
                    </div>
                </div>

                <div class="awc-header__tab">
                    <slot name="awc-header-tab"></slot>
                </div>
            </section>    
        `
  }
}
oo.styles = [ld]
oo = pd([f(hd)], oo)
const ud = w`
    :host {
        --awc-modal-user-min-height: var(--awc-modal-min-height);
    }

    :host([opened]) .awc-modal {
        position: fixed;
        z-index: 9999;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        min-height: var(--awc-modal-user-min-height, auto);
        overflow: auto;
        background-color: rgba(0, 0, 0, 0.55);
        animation-name: fade-modal;
        transition-duration: 0.3s;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    @keyframes fade-modal {
        0% {
        opacity: 0;
        }
        100% {
        opacity: 1;
        }
    }

    :host([opened]) .awc-modal__content {
        display: block;
        max-height: 600px;
        overflow: hidden;
        position: absolute;
        background-color: var(--colors-light-white);
        border-radius: var(--corner-radius-xl);
        margin: auto;
        width: 100%;
        max-width: 610px;
        top: 50%;
        left: 50%;
        will-change: transform;
        transform: translate(-50%, -50%) scale3d(1, 1, 1);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        animation: scale-animation 0.3s ease-out forwards;
    }

    @keyframes scale-animation {
        0% {
        transform: translate(-50%, -50%) scale3d(0.5, 0.5, 0.5);
        opacity: 0;
        }
        100% {
        transform: translate(-50%, -50%) scale3d(1, 1, 1);
        opacity: 1;
        }
    }

    :host .awc-modal__content {
        position: absolute;
        display: none;
        left: -9999px;
    }

    .awc-modal__header--popup {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 20px 20px 0 20px;
    }

    .awc-modal-title {
        margin: 0;
        padding: 0;
        font: var(--awc-font-h4-regular);
        color: var(--colors-light-titles);
    }

    .awc-modal__close {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .awc-modal__close svg {
        transition: fill 0.3s ease;
        fill: var(--colors-light-secondary);
    }

    .awc-modal__close:hover svg {
        fill: var(--colors-light-primary);
    }

    .awc-modal__body {
        padding: 20px 10px 20px 20px;
        position: relative;
        max-height: 600px;
        overflow-y: auto;
        scrollbar-gutter: stable;
    }

    .awc-modal__footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 15px 20px;
        border-top: 1px solid var(--colors-light-stroke);
    }

    .awc-modal__footer--popup {
        border-top: none;
        padding: 0;
    }

    .awc-modal__footer--none {
        display: none;
    }

    .awc-modal__description {
        margin: 0;
        padding: 0;
        font: var(--awc-font-caption-1-regular);
        color: var(--colors-light-secondary);
    }

    .awc-modal__buttons {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--spacing-sm);
    }

    @media screen and (max-width: 576px) {
        .awc-modal__footer {
        flex-direction: column;
        padding: 6px 20px;
        gap: var(--spacing-m);
        }

        .awc-modal__buttons {
        flex-direction: column;
        width: 100%;
        }

        .awc-modal__buttons ::slotted(awc-button) {
        display: flex;
        width: 100%;
        }
    }
`
var vd = Object.defineProperty,
  gd = Object.getOwnPropertyDescriptor,
  Yt = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? gd(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && vd(e, r, o), o
  }
const fd = 'awc-modal'
let St = class extends u {
  constructor() {
    super(...arguments),
      (this.opened = !1),
      (this._isEmtyButtonSlot = !0),
      (this._html = document.querySelector('html')),
      (this._keyClosing = this._handleKeyClosing.bind(this)),
      (this._clickOutside = this._handleClickOutside.bind(this))
  }
  get tabsGroup() {
    return this.querySelector(bi)
  }
  _handleKeyClosing(t) {
    t.key === 'Escape' && this.opened && this.close()
  }
  _handleClickOutside(t) {
    t.composedPath().includes(this.shadowRoot.querySelector('.awc-modal__content')) || this.close()
  }
  _toggleScrollLock() {
    this.opened
      ? (this._html.style.overflow = 'hidden')
      : this._html.style.removeProperty('overflow')
  }
  _disableTabsDivider() {
    this.tabsGroup && (this.tabsGroup.noDivider = !0)
  }
  connectedCallback() {
    super.connectedCallback(),
      window.addEventListener('keydown', this._keyClosing),
      this.addEventListener('click', this._clickOutside),
      document.addEventListener('DOMContentLoaded', () => {
        this._checkSlottedButton()
      })
  }
  disconnectedCallback() {
    super.disconnectedCallback(),
      window.removeEventListener('keydown', this._keyClosing),
      this.removeEventListener('click', this._clickOutside)
  }
  updated(t) {
    super.updated(t),
      t.has('opened') &&
        (this._toggleScrollLock(),
        this._disableTabsDivider(),
        this._checkSlottedButton(),
        this.opened && this.open())
  }
  get awcButtons() {
    return [...this.querySelectorAll('awc-button')]
  }
  _checkSlottedButton() {
    this.awcButtons.filter((e) => e.getAttribute('slot') === 'awc-modal-button').length
      ? (this._isEmtyButtonSlot = !1)
      : ((this._isEmtyButtonSlot = !0), (this.description = ''))
  }
  /**
   * Открытие модального окна
   * @method open
   * @public
   */
  open() {
    ;(this.opened = !0), this._modalOpenEvent(this.opened)
  }
  /**
   * Закрытие модального окна
   * @method open
   * @public
   */
  close() {
    ;(this.opened = !1), this._modalCloseEvent(this.opened)
  }
  _renderCloseIcon() {
    return Q`
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289Z"/>
            </svg>
        `
  }
  render() {
    const t = l`
            <div class="awc-modal__header--modal">
                <awc-header>
                    <h4 class="awc-modal-title">${this.heading}</h4>
                    <span class="awc-modal__close" @click=${this.close} slot="toolbar">
                        ${this._renderCloseIcon()}
                    </span>
                    <div class="awc-modal__tab" slot="awc-header-tab">
                        <slot name="awc-modal-header"></slot>
                    </div>
                </awc-header>
            </div>
        `,
      e = l`
            <div class="awc-modal__header--popup">
                <span class="awc-modal__close" @click=${this.close} slot="toolbar">
                    ${this._renderCloseIcon()}
                </span>
            </div>
        `
    return l`
            <div class="awc-modal">
                <div class="awc-modal__content"> 
                    ${this.heading ? t : e}
                    <div class="awc-modal__body">
                        <slot></slot>
                    </div>
                    <div class="awc-modal__footer ${this._isEmtyButtonSlot ? 'awc-modal__footer--popup' : ''}">
                        <p class="awc-modal__description">${this.description}</p>
                        <div class="awc-modal__buttons">
                            <slot name="awc-modal-button"></slot>
                        </div>
                    </div>
                </div>
            </div>
        `
  }
}
St.styles = [ud, Xi]
Yt([n({ type: String, reflect: !0 })], St.prototype, 'heading', 2)
Yt([n({ type: String, reflect: !0 })], St.prototype, 'description', 2)
Yt([n({ type: Boolean, reflect: !0 })], St.prototype, 'opened', 2)
Yt([gi("slot[name='awc-modal-button']")], St.prototype, 'slottedButtons', 2)
Yt([Y()], St.prototype, '_isEmtyButtonSlot', 2)
Yt([P('awc-modal-open')], St.prototype, '_modalOpenEvent', 2)
Yt([P('awc-modal-close')], St.prototype, '_modalCloseEvent', 2)
St = Yt([f(fd)], St)
const wd = w`
    :host {
        display: var(--awc-popover-display, inline-flex);
    }

    .awc-popover {
        padding: 12px;
        position: absolute;
        z-index: 99999;
        left: -9999px;
        background-color: var(--colors-light-white);
        box-shadow: 0px 2px 15px 0px #0000001a;
        border-radius: var(--corner-radius-s);
        opacity: 0;
        visibility: hidden;
        transition: opacity  0.3s ease;
    }

    :host([no-padding]) .awc-popover {
        padding: 0;
    }

    .awc-popover.awc-popover--active {
        transition: opacity  0.3s ease;
        visibility: visible;
        opacity: 1;
        max-height: 300px;
    }

    .awc-popover__arrow,
    .awc-popover__arrow::before {
        position: absolute;
        width: 8px;
        height: 8px;
        background: inherit;
    }

    .awc-popover__arrow {
        visibility: hidden;
    }

    .awc-popover__arrow::before {
        visibility: visible;
        content: "";
        transform: rotate(45deg);
    }

    .awc-popover[data-popper-placement^="top"] > .awc-popover__arrow {
        bottom: -4px;
    }

    .awc-popover[data-popper-placement^="bottom"] > .awc-popover__arrow {
        top: -4px;
    }

    .awc-popover[data-popper-placement^="left"] > .awc-popover__arrow {
        right: -4px;
    }

    .awc-popover[data-popper-placement^="right"] > .awc-popover__arrow {
        left: -4px;
    }
`
var bd = Object.defineProperty,
  _d = Object.getOwnPropertyDescriptor,
  yt = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? _d(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && bd(e, r, o), o
  }
const md = 'awc-popover',
  yd = {
    XXS: '2',
    XS: '4',
    S: '8',
    SM: '12',
    M: '16',
    L: '20',
    XL: '24',
    XXL: '32',
    XXXL: '40'
  }
let at = class extends u {
  constructor() {
    super(...arguments),
      (this.position = 'top'),
      (this.spacing = 'S'),
      (this.strategy = 'absolute'),
      (this.triggerType = 'click'),
      (this.active = !1),
      (this.disabled = !1),
      (this.noPadding = !1),
      (this.popperInstance = null),
      (this._hoverTimeout = null)
  }
  connectedCallback() {
    super.connectedCallback()
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._removeOutsideClickHandler()
  }
  _handleOutsideClick(t) {
    this.contains(t.target) || this._disconnectPopover()
  }
  _addOutsideClickHandler() {
    document.addEventListener('click', this._handleOutsideClick.bind(this))
  }
  _removeOutsideClickHandler() {
    document.removeEventListener('click', this._handleOutsideClick.bind(this))
  }
  _createPopperInstance() {
    this._nestedElement &&
      this._popover &&
      (this.popperInstance = xo(this._nestedElement, this._popover, {
        placement: this.position,
        modifiers: [
          {
            name: 'offset',
            options: { offset: [0, yd[this.spacing]] }
          }
        ],
        strategy: this.strategy
      }))
  }
  _destroyPopperInstance() {
    var t
    ;(t = this.popperInstance) == null || t.destroy(), (this.popperInstance = null)
  }
  _setupPopover() {
    this.disabled || ((this.active = !0), this._addOutsideClickHandler())
  }
  _disconnectPopover() {
    this.disabled || ((this.active = !1), this._removeOutsideClickHandler())
  }
  _onFocusIn() {
    this.disabled || ((this.active = !0), this._addOutsideClickHandler())
  }
  _onFocusOut() {
    !this.disabled &&
      !this.contains(document.activeElement) &&
      ((this.active = !1), this._removeOutsideClickHandler())
  }
  _onMouseEnter() {
    this.disabled ||
      (this._hoverTimeout && (clearTimeout(this._hoverTimeout), (this._hoverTimeout = null)),
      (this.active = !0))
  }
  _onMouseLeave() {
    !this.disabled &&
      this.triggerType === 'hover' &&
      (this._hoverTimeout = window.setTimeout(() => {
        this.active = !1
      }, 200))
  }
  updated(t) {
    super.updated(t),
      t.has('active') &&
        (this.active
          ? (this._createPopperInstance(), this._popoverOpenEvent(this.active))
          : (this._destroyPopperInstance(), this._popoverCloseEvent(this.active))),
      (t.has('triggerType') || t.has('disabled')) && this._updateEventListeners()
  }
  _updateEventListeners() {
    if (
      (this._nestedElement.removeEventListener('click', this._setupPopover.bind(this)),
      this._nestedElement.removeEventListener('mouseover', this._setupPopover.bind(this)),
      this._nestedElement.removeEventListener('mouseleave', this._onMouseLeave.bind(this)),
      this._nestedElement.removeEventListener('focusin', this._onFocusIn.bind(this)),
      this._nestedElement.removeEventListener('focusout', this._onFocusOut.bind(this)),
      this._popover.removeEventListener('mouseenter', this._onMouseEnter.bind(this)),
      this._popover.removeEventListener('mouseleave', this._onMouseLeave.bind(this)),
      !this.disabled)
    )
      switch (this.triggerType) {
        case 'click':
          this._nestedElement.addEventListener('click', this._setupPopover.bind(this))
          break
        case 'hover':
          this._nestedElement.addEventListener('mouseover', this._onMouseEnter.bind(this)),
            this._nestedElement.addEventListener('mouseleave', this._onMouseLeave.bind(this)),
            this._popover.addEventListener('mouseenter', this._onMouseEnter.bind(this)),
            this._popover.addEventListener('mouseleave', this._onMouseLeave.bind(this))
          break
        case 'focus':
          this._nestedElement.addEventListener('focusin', this._onFocusIn.bind(this)),
            this._nestedElement.addEventListener('focusout', this._onFocusOut.bind(this))
          break
      }
  }
  render() {
    const t = {
      'awc-popover': !0,
      'awc-popover--active': this.active
    }
    return l`
            <div class="awc-popover__nested">
                <slot></slot>
            </div>
            <div class=${et(t)}>
                <slot name="awc-popover-content"></slot>
            </div>
        `
  }
}
at.styles = [wd]
yt([n({ reflect: !0 })], at.prototype, 'position', 2)
yt([n({ type: String, reflect: !0 })], at.prototype, 'spacing', 2)
yt([n({ type: String, reflect: !0 })], at.prototype, 'strategy', 2)
yt([n({ type: String, reflect: !0, attribute: 'trigger-type' })], at.prototype, 'triggerType', 2)
yt([n({ type: Boolean, reflect: !0 })], at.prototype, 'active', 2)
yt([n({ type: Boolean, reflect: !0 })], at.prototype, 'disabled', 2)
yt([n({ type: Boolean, reflect: !0, attribute: 'no-padding' })], at.prototype, 'noPadding', 2)
yt([P('awc-popover-open')], at.prototype, '_popoverOpenEvent', 2)
yt([P('awc-popover-close')], at.prototype, '_popoverCloseEvent', 2)
yt([S('.awc-popover')], at.prototype, '_popover', 2)
yt([S('.awc-popover__nested')], at.prototype, '_nestedElement', 2)
at = yt([f(md)], at)
var xd = Object.defineProperty,
  Cd = Object.getOwnPropertyDescriptor,
  $d = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? Cd(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && xd(e, r, o), o
  }
const kd = 'awc-table-wrapper'
let ii = class extends u {
  createRenderRoot() {
    return this
  }
  render() {
    return l`
        
        `
  }
}
ii = $d([f(kd)], ii)
const Od = w`
    .awc-dialog {
        transition-duration: 0.3s;
        animation-name: fade-dialog-out;
    }

    :host([opened]) .awc-dialog {
        position: fixed;
        z-index: 9998;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0, 0, 0, 0.55);
        animation-name: fade-dialog-in;
        transition-duration: 0.3s;
    }

    @keyframes fade-dialog-in {
        0% {
        opacity: 0;
        }
        100% {
        opacity: 1;
        }
    }

    @keyframes fade-dialog-out {
        0% {
        opacity: 1;
        }
        100% {
        opacity: 0;
        }
    }

    :host([opened]) .awc-dialog__content {
        display: block;
        width: 100%;
        max-width: 420px;
        overflow: hidden;
        position: absolute;
        z-index: 9999;
        border-radius: var(--corner-radius-xl);
        margin: auto;
        top: 50%;
        left: 50%;
        will-change: transform;
        transform: translate(-50%, -50%) scale3d(1, 1, 1);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        animation: scale-animation 0.3s ease-out forwards;
    }

    @keyframes scale-animation {
        0% {
        transform: translate(-50%, -50%) scale3d(0.5, 0.5, 0.5);
        opacity: 0;
        }
        100% {
        transform: translate(-50%, -50%) scale3d(1, 1, 1);
        opacity: 1;
        }
    }

    :host .awc-dialog__content {
        display: none;
        position: absolute;
        left: -9999px;
    }

    :host([variant="info"]) .awc-dialog__content {
        background-color: var(--colors-light-primary);
    }

    :host([variant="error"]) .awc-dialog__content {
        background-color: var(--colors-light-warning);
    }

    .awc-dialog__body {
        padding: 24px 30px;
        display: flex;
        align-items: flex-start;
        gap: var(--spacing-l);
    }

    .awc-dialog__heading {
        margin: 0;
        user-select: none;
        max-width: 295px;
        text-align: start;
        color: var(--colors-light-white);
        font: var(--awc-font-h4-regular);
        font-size: 22px;
    }

    .awc-dialog__description {
        margin: var(--spacing-2xs) 0 0 0;
        opacity: 0.7;
        color: var(--colors-light-white);
        font: var(--awc-font-text-regular-15);
    }

    .awc-dialog__footer {
        background-color: var(--colors-dark-white);
        flex-wrap: wrap;
    }

    .awc-dialog__buttons {
        flex-wrap: wrap;
        padding: 16px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-sm);
    }

    .awc-dialog__buttons ::slotted(awc-button) {
        min-width: 110px;
        max-width: 110px;
    }

    @media screen and (max-width: 768px) {
        .awc-dialog__body {
        flex-direction: column;
        }
    }
`
var Ed = Object.defineProperty,
  Sd = Object.getOwnPropertyDescriptor,
  Jt = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? Sd(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && Ed(e, r, o), o
  }
const Pd = 'awc-dialog',
  si = {
    infoIcon: Q`
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M22.5 42C33.2696 42 42 33.2696 42 22.5C42 11.7304 33.2696 3 22.5 3C11.7304 3 3 11.7304 3 22.5C3 33.2696 11.7304 42 22.5 42ZM22.5 45C34.9264 45 45 34.9264 45 22.5C45 10.0736 34.9264 0 22.5 0C10.0736 0 0 10.0736 0 22.5C0 34.9264 10.0736 45 22.5 45ZM21 9.5C21 8.67157 21.6716 8 22.5 8C23.3284 8 24 8.67157 24 9.5V28.5C24 29.3284 23.3284 30 22.5 30C21.6716 30 21 29.3284 21 28.5V9.5ZM22.5 37C23.3284 37 24 36.3284 24 35.5C24 34.6716 23.3284 34 22.5 34C21.6716 34 21 34.6716 21 35.5C21 36.3284 21.6716 37 22.5 37Z" fill="white"/>
    </svg>
    `,
    errorIcon: Q`
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M22.5 42C33.2696 42 42 33.2696 42 22.5C42 11.7304 33.2696 3 22.5 3C11.7304 3 3 11.7304 3 22.5C3 33.2696 11.7304 42 22.5 42ZM22.5 45C34.9264 45 45 34.9264 45 22.5C45 10.0736 34.9264 0 22.5 0C10.0736 0 0 10.0736 0 22.5C0 34.9264 10.0736 45 22.5 45ZM14.1809 13.6699C13.6817 14.1691 13.6817 14.9786 14.1809 15.4778L20.9474 22.2444L14.181 29.0108C13.6817 29.51 13.6817 30.3195 14.181 30.8187C14.6802 31.318 15.4897 31.318 15.9889 30.8187L22.7554 24.0523L29.5218 30.8187C30.0211 31.318 30.8305 31.318 31.3298 30.8187C31.829 30.3195 31.829 29.51 31.3298 29.0108L24.5633 22.2444L31.3298 15.4778C31.8291 14.9786 31.8291 14.1691 31.3298 13.6699C30.8306 13.1706 30.0211 13.1706 29.5219 13.6699L22.7554 20.4364L15.9888 13.6699C15.4896 13.1706 14.6802 13.1706 14.1809 13.6699Z" fill="white"/>
    </svg>
    `
  }
let Pt = class extends u {
  constructor() {
    super(...arguments),
      (this.variant = 'info'),
      (this.opened = !1),
      (this._clickOutside = this._handleClickOutside.bind(this))
  }
  _handleClickOutside(t) {
    t.composedPath().includes(this.shadowRoot.querySelector('.awc-dialog__content')) || this.close()
  }
  _lockBody() {
    const t = document.querySelector('body')
    this.opened
      ? ((t.style.overflow = 'hidden'), (t.style.touchAction = 'none'))
      : (t.style.removeProperty('overflow'), t.style.removeProperty('touch-action'))
  }
  _onInert() {
    const t = (e) => {
      e.parentNode &&
        (Array.from(e.parentNode.childNodes).forEach((r) => {
          r !== e && r.nodeType === Node.ELEMENT_NODE && (r.inert = !0)
        }),
        e.parentNode !== document.body && t(e.parentNode))
    }
    t(this)
  }
  _removeInert() {
    document.querySelectorAll('[inert]').forEach((t) => {
      t.inert = !1
    })
  }
  _setCurrentStyleAwcButtonInSlot() {
    this._slotButtons.assignedElements().forEach((t) => {
      const e = t
      e.size = 'large'
    })
  }
  /**
   * Открытие диалогового окна
   * @method open
   * @public
   */
  open() {
    ;(this.opened = !0), this._onOpening(this.opened)
  }
  /**
   * Закрытие диалогового окна
   * @method open
   * @public
   */
  close() {
    ;(this.opened = !1), this._onClosing(this.opened)
  }
  connectedCallback() {
    super.connectedCallback(),
      this.addEventListener('click', this._clickOutside),
      document.addEventListener('DOMContentLoaded', () => {
        this.opened
          ? (this._setCurrentStyleAwcButtonInSlot(), this._onInert())
          : this._removeInert()
      })
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener('click', this._clickOutside)
  }
  updated(t) {
    super.updated(t),
      t.has('opened') &&
        (this.opened
          ? (this._setCurrentStyleAwcButtonInSlot(), this._onInert())
          : this._removeInert(),
        this._lockBody())
  }
  render() {
    const t = this.variant === 'info' ? si.infoIcon : si.errorIcon
    return l`
           <div tabindex="-1" class="awc-dialog">
                <div variant=${this.variant} class="awc-dialog__content"> 
                    <div class="awc-dialog__body">
                        <div class="awc-dialog__icon">
                            ${t}
                        </div>      
                        <div class="awc-dialog__text">
                            ${this.heading ? l`<p class="awc-dialog__heading">${this.heading}</p>` : ''}
                            ${this.description ? l`<p class="awc-dialog__description">${this.description}</p>` : ''}
                            <slot></slot>
                        </div>  
                    </div>
                    <div class="awc-dialog__footer">
                        <div class="awc-dialog__buttons">
                            <slot name="awc-dialog-button"></slot>
                        </div>
                    </div>
                </div>
            </div>
        `
  }
}
Pt.styles = [Od]
Jt([n({ type: String, reflect: !0 })], Pt.prototype, 'heading', 2)
Jt([n({ type: String, reflect: !0 })], Pt.prototype, 'description', 2)
Jt([n({ type: String, reflect: !0 })], Pt.prototype, 'variant', 2)
Jt([n({ type: Boolean, reflect: !0 })], Pt.prototype, 'opened', 2)
Jt([P('awc-dialog-open')], Pt.prototype, '_onOpening', 2)
Jt([P('awc-dialog-close')], Pt.prototype, '_onClosing', 2)
Jt([S("slot[name='awc-dialog-button']")], Pt.prototype, '_slotButtons', 2)
Pt = Jt([f(Pd)], Pt)
const Ad = w`
    :host {
        display: flex;
    }

    /* isInlineFlex */
    :host([inline-flex]) {
        display: inline-flex;
    }

    :host([full-width]) {
       width: 100%;
    }

    /* flex-direction */
    :host([flex-direction="row"]) {
        flex-direction: row;
    }

    :host([flex-direction="column"]) {
        flex-direction: column;
    }

    /* align-items */

    :host([align-items="start"]) {
        align-items: flex-start;
    }

    :host([align-items="center"]) {
        align-items: center;
    }

    :host([align-items="end"]) {
        align-items: flex-end;
    }

    :host([justify-content="center"]) {
        justify-content: center;
    }

    :host([justify-content="start"]) {
        justify-content: start;
    }

    :host([justify-content="end"]) {
        justify-content: end;
    }

    :host([justify-content="baseline"]) {
        justify-content: baseline;
    }

    :host([justify-content="space-between"]) {
        justify-content: space-between;
    }

    :host([justify-content="space-around"]) {
        justify-content: space-around;
    }

    :host([justify-content="space-evenly"]) {
        justify-content: space-evenly;
    }

    /* gap */
    :host([gap="none"]) {
        gap: 0;
    }

    :host([gap="2xs"]) {
        gap: var(--spacing-2xs);
    }

    :host([gap="xs"]) {
        gap: var(--spacing-xs);
    }
    :host([gap="s"]) {
        gap: var(--spacing-s);
    }

    :host([gap="sm"]) {
        gap: var(--spacing-sm);
    }

    :host([gap="m"]) {
        gap: var(--spacing-m);
    }

    :host([gap="l"]) {
        gap: var(--spacing-l);
    }

    :host([gap="xl"]) {
        gap: var(--spacing-xl);
    }

    :host([gap="2xl"]) {
        gap: var(--spacing-2xl);
    }

    :host([gap="3xl"]) {
        gap: var(--spacing-3xl);
    }

    :host([gap="3xl"]) {
        gap: var(--spacing-3xl);
    }

    /* flex-wrap */
    :host([flex-wrap="nowrap"]) {
        flex-wrap: nowrap;
    }

    :host([flex-wrap="wrap"]) {
        flex-wrap: wrap;
    }

    :host([flex-wrap="wrap-reverse"]) {
        flex-wrap: wrap-reverse;
    }
`
var Ld = Object.defineProperty,
  Bd = Object.getOwnPropertyDescriptor,
  Qt = (t, e, r, i) => {
    for (var o = i > 1 ? void 0 : i ? Bd(e, r) : e, s = t.length - 1, a; s >= 0; s--)
      (a = t[s]) && (o = (i ? a(e, r, o) : a(o)) || o)
    return i && o && Ld(e, r, o), o
  }
const Id = 'awc-stack'
let At = class extends u {
  constructor() {
    super(...arguments),
      (this.flexDirection = 'row'),
      (this.alignItems = 'start'),
      (this.gap = 's'),
      (this.isInline = !1),
      (this.fullWidth = !1)
  }
  render() {
    return l`<slot></slot>`
  }
}
At.styles = [Ad]
Qt(
  [n({ type: String, reflect: !0, attribute: 'flex-direction' })],
  At.prototype,
  'flexDirection',
  2
)
Qt([n({ type: String, reflect: !0, attribute: 'align-items' })], At.prototype, 'alignItems', 2)
Qt(
  [n({ type: String, reflect: !0, attribute: 'justify-content' })],
  At.prototype,
  'justifyContent',
  2
)
Qt([n({ type: String, reflect: !0 })], At.prototype, 'gap', 2)
Qt([n({ type: String, reflect: !0, attribute: 'flex-wrap' })], At.prototype, 'flexWrap', 2)
Qt([n({ type: Boolean, reflect: !0, attribute: 'inline-flex' })], At.prototype, 'isInline', 2)
Qt([n({ type: Boolean, reflect: !0, attribute: 'full-width' })], At.prototype, 'fullWidth', 2)
At = Qt([f(Id)], At)
export {
  Ye as AwcAccordion,
  ge as AwcAccordionItem,
  Ue as AwcAlert,
  tt as AwcAvatar,
  Mt as AwcAvatarGroup,
  Ce as AwcAvatarGroupCounter,
  $r as AwcBadge,
  X as AwcButton,
  Pr as AwcButtonGroup,
  ve as AwcButtonGroupItem,
  $t as AwcCard,
  q as AwcCheckbox,
  ce as AwcCheckboxGroup,
  ue as AwcChips,
  mt as AwcColorPicker,
  kr as AwcCounter,
  Pt as AwcDialog,
  wt as AwcDie,
  Ge as AwcDivider,
  Or as AwcDropdown,
  Ne as AwcDropdownGroup,
  $e as AwcDropdownItem,
  le as AwcDropdownList,
  Je as AwcEmptyState,
  Qe as AwcEmptyStateLink,
  oo as AwcHeader,
  de as AwcIcon,
  Ze as AwcIconLoader,
  A as AwcInput,
  St as AwcModal,
  ro as AwcNotifier,
  Xt as AwcPagination,
  at as AwcPopover,
  Rt as AwcProgressBar,
  W as AwcRadio,
  Zt as AwcRadioGroup,
  _t as AwcRange,
  Ar as AwcRangeItem,
  xe as AwcSegmentSwitcher,
  ne as AwcSegmentSwitcherItem,
  E as AwcSelect,
  Ct as AwcSelectButton,
  Sr as AwcSelectGroup,
  ft as AwcSelectItem,
  tr as AwcSkeleton,
  We as AwcSpinner,
  At as AwcStack,
  he as AwcStager,
  ke as AwcSteps,
  jt as AwcSwitcher,
  xr as AwcTab,
  ii as AwcTableWrapper,
  Cr as AwcTabsGroup,
  Ae as AwcTag,
  K as AwcTextarea,
  Zr as AwcToolbarButton,
  Xr as AwcToolbarGroup,
  gt as AwcTooltip,
  bt as AwcUserInfo
}
