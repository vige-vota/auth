import { jsxs as M, Fragment as p, jsx as r } from "react/jsx-runtime";
import * as b from "react";
import { useState as O, createContext as k, useContext as P, useCallback as H, useEffect as B, useMemo as V, forwardRef as L } from "react";
import { Modal as D, Button as w, Popover as $, FormGroup as J, ValidatedOptions as g, Select as K, SelectOption as Q, Switch as U, TextInput as W, TextArea as X, AlertGroup as Y, Alert as Z, AlertVariant as x, AlertActionCloseButton as e1 } from "@patternfly/react-core";
import { useFormContext as A, Controller as T, useController as q } from "react-hook-form";
const B1 = ({
  modalTitle: e,
  modalMessage: t,
  buttonTitle: n,
  isDisabled: o,
  buttonVariant: c,
  onContinue: a,
  continueLabel: l = "continue",
  cancelLabel: s = "doCancel",
  component: d = w,
  children: u,
  ...h
}) => {
  const [i, m] = O(!1);
  return /* @__PURE__ */ M(p, { children: [
    /* @__PURE__ */ r(
      d,
      {
        variant: c,
        onClick: () => m(!0),
        isDisabled: o,
        children: n
      }
    ),
    /* @__PURE__ */ r(
      D,
      {
        variant: "small",
        ...h,
        title: e,
        isOpen: i,
        onClose: () => m(!1),
        actions: [
          /* @__PURE__ */ r(
            w,
            {
              id: "modal-confirm",
              variant: "primary",
              onClick: () => {
                m(!1), a();
              },
              children: l
            },
            "confirm"
          ),
          /* @__PURE__ */ r(
            w,
            {
              id: "modal-cancel",
              variant: "secondary",
              onClick: () => m(!1),
              children: s
            },
            "cancel"
          )
        ],
        children: t || u
      }
    )
  ] });
};
function t1(e, t) {
  var n = {};
  for (var o in e)
    Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var c = 0, o = Object.getOwnPropertySymbols(e); c < o.length; c++)
      t.indexOf(o[c]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[c]) && (n[o[c]] = e[o[c]]);
  return n;
}
var C;
(function(e) {
  e.sm = "sm", e.md = "md", e.lg = "lg", e.xl = "xl";
})(C || (C = {}));
const n1 = (e) => {
  switch (e) {
    case C.sm:
      return "1em";
    case C.md:
      return "1.5em";
    case C.lg:
      return "2em";
    case C.xl:
      return "3em";
    default:
      return "1em";
  }
};
let o1 = 0;
function f({ name: e, xOffset: t = 0, yOffset: n = 0, width: o, height: c, svgPath: a }) {
  var l;
  return l = class extends b.Component {
    constructor() {
      super(...arguments), this.id = `icon-title-${o1++}`;
    }
    render() {
      const d = this.props, { size: u, color: h, title: i, noVerticalAlign: m } = d, v = t1(d, ["size", "color", "title", "noVerticalAlign"]), I = !!i, z = n1(u), N = -0.125 * Number.parseFloat(z), _ = m ? null : { verticalAlign: `${N}em` }, j = [t, n, o, c].join(" ");
      return b.createElement(
        "svg",
        Object.assign({ style: _, fill: h, height: z, width: z, viewBox: j, "aria-labelledby": I ? this.id : null, "aria-hidden": I ? null : !0, role: "img" }, v),
        I && b.createElement("title", { id: this.id }, i),
        b.createElement("path", { d: a })
      );
    }
  }, l.displayName = e, l.defaultProps = {
    color: "currentColor",
    size: C.sm,
    noVerticalAlign: !1
  }, l;
}
const c1 = {
  name: "BitbucketIcon",
  height: 512,
  width: 512,
  svgPath: "M22.2 32A16 16 0 0 0 6 47.8a26.35 26.35 0 0 0 .2 2.8l67.9 412.1a21.77 21.77 0 0 0 21.3 18.2h325.7a16 16 0 0 0 16-13.4L505 50.7a16 16 0 0 0-13.2-18.3 24.58 24.58 0 0 0-2.8-.2L22.2 32zm285.9 297.8h-104l-28.1-147h157.3l-25.2 147z",
  yOffset: 0,
  xOffset: 0
}, r1 = f(c1), l1 = {
  name: "CubeIcon",
  height: 512,
  width: 512,
  svgPath: "M239.1 6.3l-208 78c-18.7 7-31.1 25-31.1 45v225.1c0 18.2 10.3 34.8 26.5 42.9l208 104c13.5 6.8 29.4 6.8 42.9 0l208-104c16.3-8.1 26.5-24.8 26.5-42.9V129.3c0-20-12.4-37.9-31.1-44.9l-208-78C262 2.2 250 2.2 239.1 6.3zM256 68.4l192 72v1.1l-192 78-192-78v-1.1l192-72zm32 356V275.5l160-65v133.9l-160 80z",
  yOffset: 0,
  xOffset: 0
}, a1 = f(l1), i1 = {
  name: "FacebookSquareIcon",
  height: 512,
  width: 448,
  svgPath: "M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z",
  yOffset: 0,
  xOffset: 0
}, s1 = f(i1), d1 = {
  name: "GithubIcon",
  height: 512,
  width: 496,
  svgPath: "M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z",
  yOffset: 0,
  xOffset: 0
}, f1 = f(d1), u1 = {
  name: "GitlabIcon",
  height: 512,
  width: 512,
  svgPath: "M105.2 24.9c-3.1-8.9-15.7-8.9-18.9 0L29.8 199.7h132c-.1 0-56.6-174.8-56.6-174.8zM.9 287.7c-2.6 8 .3 16.9 7.1 22l247.9 184-226.2-294zm160.8-88l94.3 294 94.3-294zm349.4 88l-28.8-88-226.3 294 247.9-184c6.9-5.1 9.7-14 7.2-22zM425.7 24.9c-3.1-8.9-15.7-8.9-18.9 0l-56.6 174.8h132z",
  yOffset: 0,
  xOffset: 0
}, h1 = f(u1), m1 = {
  name: "GoogleIcon",
  height: 512,
  width: 488,
  svgPath: "M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z",
  yOffset: 0,
  xOffset: 0
}, g1 = f(m1), C1 = {
  name: "HelpIcon",
  height: 1024,
  width: 1024,
  svgPath: "M521.3,576 C627.5,576 713.7,502 713.7,413.7 C713.7,325.4 627.6,253.6 521.3,253.6 C366,253.6 334.5,337.7 329.2,407.2 C329.2,414.3 335.2,416 343.5,416 L445,416 C450.5,416 458,415.5 460.8,406.5 C460.8,362.6 582.9,357.1 582.9,413.6 C582.9,441.9 556.2,470.9 521.3,473 C486.4,475.1 447.3,479.8 447.3,521.7 L447.3,553.8 C447.3,570.8 456.1,576 472,576 C487.9,576 521.3,576 521.3,576 M575.3,751.3 L575.3,655.3 C575.313862,651.055109 573.620137,646.982962 570.6,644 C567.638831,640.947672 563.552355,639.247987 559.3,639.29884 L463.3,639.29884 C459.055109,639.286138 454.982962,640.979863 452,644 C448.947672,646.961169 447.247987,651.047645 447.29884,655.3 L447.29884,751.3 C447.286138,755.544891 448.979863,759.617038 452,762.6 C454.961169,765.652328 459.047645,767.352013 463.3,767.30116 L559.3,767.30116 C563.544891,767.313862 567.617038,765.620137 570.6,762.6 C573.659349,759.643612 575.360354,755.553963 575.3,751.3 M512,896 C300.2,896 128,723.9 128,512 C128,300.3 300.2,128 512,128 C723.8,128 896,300.2 896,512 C896,723.8 723.7,896 512,896 M512.1,0 C229.7,0 0,229.8 0,512 C0,794.2 229.8,1024 512.1,1024 C794.4,1024 1024,794.3 1024,512 C1024,229.7 794.4,0 512.1,0",
  yOffset: 0,
  xOffset: 0
}, S = f(C1), v1 = {
  name: "InstagramIcon",
  height: 512,
  width: 448,
  svgPath: "M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z",
  yOffset: 0,
  xOffset: 0
}, I1 = f(v1), b1 = {
  name: "LinkedinIcon",
  height: 512,
  width: 448,
  svgPath: "M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z",
  yOffset: 0,
  xOffset: 0
}, O1 = f(b1), y1 = {
  name: "MicrosoftIcon",
  height: 512,
  width: 448,
  svgPath: "M0 32h214.6v214.6H0V32zm233.4 0H448v214.6H233.4V32zM0 265.4h214.6V480H0V265.4zm233.4 0H448V480H233.4V265.4z",
  yOffset: 0,
  xOffset: 0
}, z1 = f(y1), w1 = {
  name: "OpenshiftIcon",
  height: 100,
  width: 100,
  svgPath: "M145.7,45.3l-16.1,5.8c0.2,2.6,0.6,5.1,1.3,7.6l15.3-5.6C145.7,50.6,145.5,47.9,145.7,45.3M216.7,27.5c-1.1-2.3-2.4-4.5-3.9-6.6l-16.1,5.8c1.9,1.9,3.4,4.1,4.7,6.4L216.7,27.5zM181.4,23c3.3,1.6,6.2,3.7,8.7,6.2l16.1-5.8c-4.4-6.2-10.5-11.5-17.9-14.9c-22.9-10.7-50.3-0.7-61,22.2c-3.5,7.4-4.8,15.3-4.1,23l16.1-5.8c0.3-3.5,1.1-7,2.7-10.3C148.7,22.5,166.4,16,181.4,23M131.9,58.4l-15.3,5.6c1.4,5.6,3.8,10.8,7.2,15.5l16-5.8C135.8,69.4,133,64.1,131.9,58.4M198.5,52.3c-0.3,3.5-1.1,7-2.7,10.3C188.8,77.5,171,84,156.1,77c-3.3-1.6-6.3-3.7-8.7-6.2l-16,5.8c4.4,6.2,10.5,11.5,17.9,14.9c22.9,10.7,50.3,0.7,61-22.2c3.5-7.4,4.7-15.3,4.1-22.9L198.5,52.3zM202.4,32.7l-15.3,5.6c2.8,5.1,4.2,10.9,3.7,16.8l16-5.8C206.5,43.5,204.9,37.9,202.4,32.7",
  yOffset: 0,
  xOffset: 116
}, x1 = f(w1), M1 = {
  name: "PaypalIcon",
  height: 512,
  width: 384,
  svgPath: "M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4.7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9.7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z",
  yOffset: 0,
  xOffset: 0
}, V1 = f(M1), S1 = {
  name: "StackOverflowIcon",
  height: 512,
  width: 384,
  svgPath: "M290.7 311L95 269.7 86.8 309l195.7 41zm51-87L188.2 95.7l-25.5 30.8 153.5 128.3zm-31.2 39.7L129.2 179l-16.7 36.5L293.7 300zM262 32l-32 24 119.3 160.3 32-24zm20.5 328h-200v39.7h200zm39.7 80H42.7V320h-40v160h359.5V320h-40z",
  yOffset: 0,
  xOffset: 0
}, p1 = f(S1), k1 = {
  name: "TwitterIcon",
  height: 512,
  width: 512,
  svgPath: "M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z",
  yOffset: 0,
  xOffset: 0
}, P1 = f(k1);
function H1(e, t) {
  const n = k(t);
  return n.displayName = e, n;
}
function L1(e) {
  return e != null;
}
function A1(e) {
  const t = P(e);
  if (L1(t))
    return t;
  throw new Error(
    `No provider found for ${e.displayName ? `the '${e.displayName}'` : "an unknown"} context, make sure it is included in your component hierarchy.`
  );
}
function T1(e, t, n) {
  const [o, c] = O(
    () => e.getItem(t) ?? n
  ), a = H((l) => {
    c(l), e.setItem(t, l);
  }, []);
  return B(() => {
    c(e.getItem(t) ?? n), window.addEventListener("storage", l);
    function l(s) {
      s.storageArea === e && (s.key === null || s.key === t) && c(s.newValue ?? n);
    }
    return () => window.removeEventListener("storage", l);
  }, [e, t]), [o, a];
}
function q1(e, t, n) {
  const o = V(
    () => JSON.stringify(n),
    [n]
  ), [c, a] = T1(
    e,
    t,
    o
  ), l = V(() => JSON.parse(c), [c]), s = H(
    (d) => a(JSON.stringify(d)),
    []
  );
  return [l, s];
}
const F = H1(
  "HelpContext",
  void 0
), F1 = () => A1(F), $1 = ({ children: e }) => {
  const [t, n] = q1(localStorage, "helpEnabled", !0);
  function o() {
    n(!t);
  }
  return /* @__PURE__ */ r(F.Provider, { value: { enabled: t, toggleHelp: o }, children: e });
}, G1 = ({
  helpText: e,
  fieldLabelId: t,
  noVerticalAlign: n = !0,
  unWrap: o = !1
}) => {
  const { enabled: c } = F1();
  return c ? /* @__PURE__ */ r($, { bodyContent: e, children: /* @__PURE__ */ M(p, { children: [
    !o && /* @__PURE__ */ r(
      "button",
      {
        "data-testid": `help-label-${t}`,
        "aria-label": t,
        onClick: (a) => a.preventDefault(),
        className: "pf-c-form__group-label-help",
        children: /* @__PURE__ */ r(S, { noVerticalAlign: n })
      }
    ),
    o && /* @__PURE__ */ r(S, { noVerticalAlign: n })
  ] }) }) : null;
}, y = ({
  name: e,
  label: t,
  labelIcon: n,
  error: o,
  children: c,
  ...a
}) => /* @__PURE__ */ r(
  J,
  {
    label: t || e,
    fieldId: e,
    labelIcon: n ? /* @__PURE__ */ r(G1, { helpText: n, fieldLabelId: e }) : void 0,
    helperTextInvalid: o?.message,
    validated: o ? g.error : g.default,
    ...a,
    children: c
  }
), J1 = ({
  name: e,
  label: t,
  options: n,
  controller: o,
  ...c
}) => {
  const {
    control: a,
    formState: { errors: l }
  } = A(), [s, d] = O(!1);
  return /* @__PURE__ */ r(
    y,
    {
      name: e,
      label: t,
      isRequired: o.rules?.required === !0,
      error: l[e],
      children: /* @__PURE__ */ r(
        T,
        {
          ...o,
          name: e,
          control: a,
          render: ({ field: { onChange: u, value: h } }) => /* @__PURE__ */ r(
            K,
            {
              ...c,
              toggleId: e,
              onToggle: (i) => d(i),
              selections: h,
              onSelect: (i, m) => {
                const v = m.toString();
                h.includes(v) ? u(h.filter((I) => I !== v)) : u([...h, v]);
              },
              onClear: (i) => {
                i.stopPropagation(), u([]);
              },
              isOpen: s,
              validated: l[e] ? g.error : g.default,
              children: n.map((i) => /* @__PURE__ */ r(
                Q,
                {
                  value: typeof i == "string" ? i : i.key,
                  children: typeof i == "string" ? i : i.value
                },
                typeof i == "string" ? i : i.key
              ))
            }
          )
        }
      )
    }
  );
}, K1 = (e) => {
  const t = e.defaultValue ?? !1, { control: n } = A();
  return /* @__PURE__ */ r(
    y,
    {
      name: e.name,
      isRequired: e.rules?.required === !0,
      label: e.label,
      labelIcon: e.labelIcon,
      children: /* @__PURE__ */ r(
        T,
        {
          control: n,
          name: e.name,
          defaultValue: t,
          render: ({ field: { onChange: o, value: c } }) => /* @__PURE__ */ r(
            U,
            {
              id: e.name,
              "data-testid": e.name,
              label: e.labelOn,
              labelOff: e.labelOff,
              isChecked: c,
              onChange: (a) => o(a)
            }
          )
        }
      )
    }
  );
}, G = L(({ onChange: e, ...t }, n) => /* @__PURE__ */ r(W, { ...t, ref: n, onChange: (c, a) => e?.(a) }));
G.displayName = "TextInput";
const Q1 = (e) => {
  const t = !!e.rules?.required, n = e.defaultValue ?? "", { field: o, fieldState: c } = q({
    ...e,
    defaultValue: n
  });
  return /* @__PURE__ */ r(
    y,
    {
      name: e.name,
      label: e.label,
      labelIcon: e.labelIcon,
      isRequired: t,
      error: c.error,
      children: /* @__PURE__ */ r(
        G,
        {
          isRequired: t,
          id: e.name,
          "data-testid": e.name,
          validated: c.error ? g.error : g.default,
          isDisabled: e.isDisabled,
          ...o
        }
      )
    }
  );
}, E = L(({ onChange: e, ...t }, n) => /* @__PURE__ */ r(X, { ...t, ref: n, onChange: (c, a) => e?.(a) }));
E.displayName = "TextArea";
const U1 = (e) => {
  const t = !!e.rules?.required, n = e.defaultValue ?? "", { field: o, fieldState: c } = q({
    ...e,
    defaultValue: n
  });
  return /* @__PURE__ */ r(
    y,
    {
      isRequired: t,
      label: e.label,
      labelIcon: e.labelIcon,
      name: e.name,
      error: c.error,
      children: /* @__PURE__ */ r(
        E,
        {
          isRequired: t,
          id: e.name,
          "data-testid": e.name,
          validated: c.error ? g.error : g.default,
          isDisabled: e.isDisabled,
          ...o
        }
      )
    }
  );
}, R = k(void 0), W1 = () => P(R), X1 = ({ children: e }) => {
  const [t, n] = O([]), o = (l) => {
    n((s) => s.filter((d) => d.id !== l));
  }, c = (l, s = x.success, d) => {
    n([
      {
        id: Math.random() * 100,
        message: l,
        variant: s,
        description: d
      },
      ...t
    ]);
  }, a = (l) => {
    c(l, x.danger);
  };
  return /* @__PURE__ */ M(R.Provider, { value: { addAlert: c, addError: a }, children: [
    /* @__PURE__ */ r(Y, { isToast: !0, children: t.map(({ id: l, variant: s, message: d, description: u }) => /* @__PURE__ */ r(
      Z,
      {
        isLiveRegion: !0,
        variant: x[s],
        variantLabel: "",
        title: d,
        actionClose: /* @__PURE__ */ r(
          e1,
          {
            title: d,
            onClose: () => o(l)
          }
        ),
        timeout: !0,
        onTimeout: () => o(l),
        children: u && /* @__PURE__ */ r("p", { children: u })
      },
      l
    )) }),
    e
  ] });
}, Y1 = ({ icon: e }) => {
  const t = E1(e);
  return /* @__PURE__ */ r(t, { size: "lg", alt: e });
};
function E1(e) {
  switch (e) {
    case "github":
      return f1;
    case "facebook":
      return s1;
    case "gitlab":
      return h1;
    case "google":
      return g1;
    case "linkedin":
      return O1;
    case "openshift-v3":
    case "openshift-v4":
      return x1;
    case "stackoverflow":
      return p1;
    case "twitter":
      return P1;
    case "microsoft":
      return z1;
    case "bitbucket":
      return r1;
    case "instagram":
      return I1;
    case "paypal":
      return V1;
    default:
      return a1;
  }
}
export {
  X1 as AlertProvider,
  B1 as ContinueCancelModal,
  $1 as Help,
  G1 as HelpItem,
  Y1 as IconMapper,
  G as KeycloakTextInput,
  J1 as SelectControl,
  K1 as SwitchControl,
  U1 as TextAreaControl,
  Q1 as TextControl,
  H1 as createNamedContext,
  L1 as isDefined,
  W1 as useAlerts,
  F1 as useHelp,
  A1 as useRequiredContext,
  q1 as useStoredState
};
