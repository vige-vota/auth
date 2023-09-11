import { jsxs as S, Fragment as k, jsx as r } from "react/jsx-runtime";
import { useState as b, createContext as q, useContext as O, useCallback as T, useEffect as P, useMemo as x, forwardRef as A } from "react";
import { Modal as G, Button as v, Popover as M, FormGroup as _, ValidatedOptions as f, Select as B, SelectOption as J, Switch as $, TextInput as j, TextArea as z, AlertGroup as K, Alert as Q, AlertVariant as y, AlertActionCloseButton as U } from "@patternfly/react-core";
import { useFormContext as V, Controller as F, useController as R } from "react-hook-form";
import { HelpIcon as w, CubeIcon as X, PaypalIcon as Y, InstagramIcon as Z, BitbucketIcon as W, MicrosoftIcon as p, TwitterIcon as ee, StackOverflowIcon as te, OpenshiftIcon as ne, LinkedinIcon as re, GoogleIcon as le, GitlabIcon as oe, FacebookSquareIcon as ae, GithubIcon as ie } from "@patternfly/react-icons";
const Se = ({
  modalTitle: e,
  modalMessage: t,
  buttonTitle: n,
  isDisabled: l,
  buttonVariant: o,
  onContinue: i,
  continueLabel: a = "continue",
  cancelLabel: s = "doCancel",
  component: d = v,
  children: m,
  ...h
}) => {
  const [u, c] = b(!1);
  return /* @__PURE__ */ S(k, { children: [
    /* @__PURE__ */ r(
      d,
      {
        variant: o,
        onClick: () => c(!0),
        isDisabled: l,
        children: n
      }
    ),
    /* @__PURE__ */ r(
      G,
      {
        variant: "small",
        ...h,
        title: e,
        isOpen: u,
        onClose: () => c(!1),
        actions: [
          /* @__PURE__ */ r(
            v,
            {
              id: "modal-confirm",
              variant: "primary",
              onClick: () => {
                c(!1), i();
              },
              children: a
            },
            "confirm"
          ),
          /* @__PURE__ */ r(
            v,
            {
              id: "modal-cancel",
              variant: "secondary",
              onClick: () => c(!1),
              children: s
            },
            "cancel"
          )
        ],
        children: t || m
      }
    )
  ] });
};
function ce(e, t) {
  const n = q(t);
  return n.displayName = e, n;
}
function se(e) {
  return e != null;
}
function de(e) {
  const t = O(e);
  if (se(t))
    return t;
  throw new Error(
    `No provider found for ${e.displayName ? `the '${e.displayName}'` : "an unknown"} context, make sure it is included in your component hierarchy.`
  );
}
function ue(e, t, n) {
  const [l, o] = b(
    () => e.getItem(t) ?? n
  ), i = T((a) => {
    o(a), e.setItem(t, a);
  }, []);
  return P(() => {
    o(e.getItem(t) ?? n), window.addEventListener("storage", a);
    function a(s) {
      s.storageArea === e && (s.key === null || s.key === t) && o(s.newValue ?? n);
    }
    return () => window.removeEventListener("storage", a);
  }, [e, t]), [l, i];
}
function fe(e, t, n) {
  const l = x(
    () => JSON.stringify(n),
    [n]
  ), [o, i] = ue(
    e,
    t,
    l
  ), a = x(() => JSON.parse(o), [o]), s = T(
    (d) => i(JSON.stringify(d)),
    []
  );
  return [a, s];
}
const H = ce(
  "HelpContext",
  void 0
), me = () => de(H), xe = ({ children: e }) => {
  const [t, n] = fe(localStorage, "helpEnabled", !0);
  function l() {
    n(!t);
  }
  return /* @__PURE__ */ r(H.Provider, { value: { enabled: t, toggleHelp: l }, children: e });
}, he = ({
  helpText: e,
  fieldLabelId: t,
  noVerticalAlign: n = !0,
  unWrap: l = !1
}) => {
  const { enabled: o } = me();
  return o ? /* @__PURE__ */ r(M, { bodyContent: e, children: /* @__PURE__ */ S(k, { children: [
    !l && /* @__PURE__ */ r(
      "button",
      {
        "data-testid": `help-label-${t}`,
        "aria-label": t,
        onClick: (i) => i.preventDefault(),
        className: "pf-c-form__group-label-help",
        children: /* @__PURE__ */ r(w, { noVerticalAlign: n })
      }
    ),
    l && /* @__PURE__ */ r(w, { noVerticalAlign: n })
  ] }) }) : null;
}, g = ({
  name: e,
  label: t,
  labelIcon: n,
  error: l,
  children: o,
  ...i
}) => /* @__PURE__ */ r(
  _,
  {
    label: t || e,
    fieldId: e,
    labelIcon: n ? /* @__PURE__ */ r(he, { helpText: n, fieldLabelId: e }) : void 0,
    helperTextInvalid: l?.message,
    validated: l ? f.error : f.default,
    ...i,
    children: o
  }
), we = ({
  name: e,
  label: t,
  options: n,
  controller: l,
  variant: o,
  ...i
}) => {
  const {
    control: a,
    formState: { errors: s }
  } = V(), [d, m] = b(!1);
  return /* @__PURE__ */ r(
    g,
    {
      name: e,
      label: t,
      isRequired: l.rules?.required === !0,
      error: s[e],
      children: /* @__PURE__ */ r(
        F,
        {
          ...l,
          name: e,
          control: a,
          render: ({ field: { onChange: h, value: u } }) => /* @__PURE__ */ r(
            B,
            {
              ...i,
              toggleId: e,
              onToggle: (c) => m(c),
              selections: typeof n[0] != "string" && n.find(
                (c) => c.key === u[0]
              )?.value || u,
              onSelect: (c, C) => {
                if (o === "typeaheadmulti") {
                  const I = C.toString();
                  u.includes(I) ? h(u.filter((L) => L !== I)) : h([...u, I]);
                } else
                  h([C]), m(!1);
              },
              onClear: (c) => {
                c.stopPropagation(), h([]);
              },
              isOpen: d,
              variant: o,
              validated: s[e] ? f.error : f.default,
              children: n.map((c) => /* @__PURE__ */ r(
                J,
                {
                  value: typeof c == "string" ? c : c.key,
                  children: typeof c == "string" ? c : c.value
                },
                typeof c == "string" ? c : c.key
              ))
            }
          )
        }
      )
    }
  );
}, ke = (e) => {
  const t = e.defaultValue ?? !1, { control: n } = V();
  return /* @__PURE__ */ r(
    g,
    {
      name: e.name,
      isRequired: e.rules?.required === !0,
      label: e.label,
      labelIcon: e.labelIcon,
      children: /* @__PURE__ */ r(
        F,
        {
          control: n,
          name: e.name,
          defaultValue: t,
          render: ({ field: { onChange: l, value: o } }) => /* @__PURE__ */ r(
            $,
            {
              id: e.name,
              "data-testid": e.name,
              label: e.labelOn,
              labelOff: e.labelOff,
              isChecked: e.stringify ? o === "true" : o,
              onChange: (i, a) => {
                const s = e.stringify ? i.toString() : i;
                e.onChange?.(i, a), l(s);
              }
            }
          )
        }
      )
    }
  );
}, N = A(({ onChange: e, ...t }, n) => /* @__PURE__ */ r(j, { ...t, ref: n, onChange: (o, i) => e?.(i) }));
N.displayName = "TextInput";
const qe = (e) => {
  const { labelIcon: t, ...n } = e, l = !!e.rules?.required, o = e.defaultValue ?? "", { field: i, fieldState: a } = R({
    ...e,
    defaultValue: o
  });
  return /* @__PURE__ */ r(
    g,
    {
      name: e.name,
      label: e.label,
      labelIcon: t,
      isRequired: l,
      error: a.error,
      children: /* @__PURE__ */ r(
        N,
        {
          isRequired: l,
          id: e.name,
          "data-testid": e.name,
          validated: a.error ? f.error : f.default,
          isDisabled: e.isDisabled,
          ...n,
          ...i
        }
      )
    }
  );
}, D = A(({ onChange: e, ...t }, n) => /* @__PURE__ */ r(z, { ...t, ref: n, onChange: (o, i) => e?.(i) }));
D.displayName = "TextArea";
const Oe = (e) => {
  const t = !!e.rules?.required, n = e.defaultValue ?? "", { field: l, fieldState: o } = R({
    ...e,
    defaultValue: n
  });
  return /* @__PURE__ */ r(
    g,
    {
      isRequired: t,
      label: e.label,
      labelIcon: e.labelIcon,
      name: e.name,
      error: o.error,
      children: /* @__PURE__ */ r(
        D,
        {
          isRequired: t,
          id: e.name,
          "data-testid": e.name,
          validated: o.error ? f.error : f.default,
          isDisabled: e.isDisabled,
          ...l
        }
      )
    }
  );
}, E = q(void 0), Te = () => O(E), Ae = ({ children: e }) => {
  const [t, n] = b([]), l = (a) => {
    n((s) => s.filter((d) => d.id !== a));
  }, o = (a, s = y.success, d) => {
    n([
      {
        id: Math.random() * 100,
        message: a,
        variant: s,
        description: d
      },
      ...t
    ]);
  }, i = (a) => {
    o(a, y.danger);
  };
  return /* @__PURE__ */ S(E.Provider, { value: { addAlert: o, addError: i }, children: [
    /* @__PURE__ */ r(K, { isToast: !0, "data-testid": "alerts", children: t.map(({ id: a, variant: s, message: d, description: m }) => /* @__PURE__ */ r(
      Q,
      {
        isLiveRegion: !0,
        variant: y[s],
        variantLabel: "",
        title: d,
        actionClose: /* @__PURE__ */ r(
          U,
          {
            title: d,
            onClose: () => l(a)
          }
        ),
        timeout: !0,
        onTimeout: () => l(a),
        children: m && /* @__PURE__ */ r("p", { children: m })
      },
      a
    )) }),
    e
  ] });
}, Ve = ({ icon: e }) => {
  const t = be(e);
  return /* @__PURE__ */ r(t, { size: "lg", alt: e });
};
function be(e) {
  switch (e) {
    case "github":
      return ie;
    case "facebook":
      return ae;
    case "gitlab":
      return oe;
    case "google":
      return le;
    case "linkedin":
      return re;
    case "openshift-v3":
    case "openshift-v4":
      return ne;
    case "stackoverflow":
      return te;
    case "twitter":
      return ee;
    case "microsoft":
      return p;
    case "bitbucket":
      return W;
    case "instagram":
      return Z;
    case "paypal":
      return Y;
    default:
      return X;
  }
}
export {
  Ae as AlertProvider,
  Se as ContinueCancelModal,
  xe as Help,
  he as HelpItem,
  Ve as IconMapper,
  N as KeycloakTextInput,
  we as SelectControl,
  ke as SwitchControl,
  Oe as TextAreaControl,
  qe as TextControl,
  ce as createNamedContext,
  se as isDefined,
  Te as useAlerts,
  me as useHelp,
  de as useRequiredContext,
  fe as useStoredState
};
