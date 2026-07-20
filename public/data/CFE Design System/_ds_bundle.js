/* @ds-bundle: {"format":3,"namespace":"CFEDesignSystem_1ee1e2","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"DataTable","sourcePath":"components/data/DataTable.jsx"},{"name":"KpiStat","sourcePath":"components/data/KpiStat.jsx"},{"name":"MetricBar","sourcePath":"components/data/MetricBar.jsx"},{"name":"Alert","sourcePath":"components/feedback/Alert.jsx"},{"name":"Badge","sourcePath":"components/feedback/Badge.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/core/Button.jsx":"27129f1dd0ea","components/core/Card.jsx":"88b75a6087ff","components/core/Icon.jsx":"d7ac7d4c25fe","components/core/IconButton.jsx":"97733bfc2fa9","components/data/DataTable.jsx":"7ddbc18243f0","components/data/KpiStat.jsx":"f19eb0dd163f","components/data/MetricBar.jsx":"fa353c5df620","components/feedback/Alert.jsx":"8c21a4d2f841","components/feedback/Badge.jsx":"ba9d9f9db3dc","components/forms/Checkbox.jsx":"d00317e88b51","components/forms/Input.jsx":"8fe751729395","components/forms/Select.jsx":"693b7f05679e","components/forms/Switch.jsx":"f39600ea60c8","components/navigation/Tabs.jsx":"3a99651ae847","ui_kits/mom-dashboard/AppShell.jsx":"20c6449fa377","ui_kits/mom-dashboard/Charts.jsx":"0343b10bb668","ui_kits/mom-dashboard/OeeDashboard.jsx":"76f0c6b0ae89","ui_kits/registration/RegistrationApp.jsx":"825fcbf8dc96"},"inlinedExternals":[],"unexposedExports":[{"name":"iconNames","sourcePath":"components/core/Icon.jsx"}]} */

(() => {

const __ds_ns = (window.CFEDesignSystem_1ee1e2 = window.CFEDesignSystem_1ee1e2 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * CFE brand icon set. Authentic geometric glyphs extracted from the
 * VMA / CFE application styling guide (menu, user, search, settings, mail,
 * bell, close, chevron-right) plus house-built chevron rotations and a few
 * app-chrome glyphs (plus, calendar, filter) in the same bold geometric
 * language. All render in currentColor and scale to the `size` prop.
 */
const ICONS = {
  "menu": {
    "vb": "0 0 256 256",
    "inner": "<g stroke-width=\"0\" stroke-miterlimit=\"10\" fill=\"none\" transform=\"matrix(2.81 0 0 2.81 1.40659 1.40659)\"><path d=\"M86 21.571 4 21.571C1.791 21.571 0 19.78 0 17.571 0 15.362 1.791 13.571 4 13.571L86 13.571C88.209 13.571 90 15.362 90 17.571 90 19.78 88.209 21.571 86 21.571Z\" stroke-width=\"1\" fill=\"currentColor\"></path><path d=\"M86 49 4 49C1.791 49 0 47.209 0 45 0 42.791 1.791 41 4 41L86 41C88.209 41 90 42.791 90 45 90 47.209 88.209 49 86 49Z\" stroke-width=\"1\" fill=\"currentColor\"></path><path d=\"M86 76.429 4 76.429C1.791 76.429 0 74.638 0 72.429 0 70.22 1.791 68.429 4 68.429L86 68.429C88.209 68.429 90 70.22 90 72.429 90 74.638 88.209 76.429 86 76.429Z\" stroke-width=\"1\" fill=\"currentColor\"></path></g>"
  },
  "user": {
    "vb": "0 0 256 256",
    "inner": "<g stroke-width=\"0\" stroke-miterlimit=\"10\" fill=\"none\" transform=\"matrix(2.81 0 0 2.81 1.40659 1.40659)\"><path d=\"M45 53.718C34.978 53.718 26.825 45.565 26.825 35.543 26.825 25.521 34.978 17.368 45 17.368 55.021 17.368 63.175 25.521 63.175 35.543 63.175 45.565 55.021 53.718 45 53.718Z\" stroke-width=\"1\" fill=\"currentColor\"></path><path d=\"M45 0C20.187 0 0 20.187 0 45 0 69.813 20.187 90 45 90 69.813 90 90 69.813 90 45 90 20.187 69.813 0 45 0ZM74.821 70.096C71.278 64.843 66.364 60.528 60.662 57.763 58.401 56.667 55.761 56.683 53.415 57.81 50.777 59.078 47.945 59.72 45 59.72 42.055 59.72 39.224 59.077 36.585 57.81 34.242 56.685 31.601 56.667 29.338 57.763 23.636 60.528 18.722 64.843 15.178 70.096 9.457 63.308 6 54.552 6 45 6 23.495 23.495 6 45 6 66.505 6 84 23.495 84 45 84 54.552 80.543 63.308 74.821 70.096Z\" stroke-width=\"1\" fill=\"currentColor\"></path></g>"
  },
  "search": {
    "vb": "0 0 24 24",
    "inner": "<path d=\"M15.7955 15.8111 21 21M18 10.5C18 14.6421 14.6421 18 10.5 18 6.35786 18 3 14.6421 3 10.5 3 6.35786 6.35786 3 10.5 3 14.6421 3 18 6.35786 18 10.5Z\" class=\"MsftOfcResponsive_Fill_0c365d MsftOfcThm_Background1_Stroke_v2\" stroke=\"currentColor\" stroke-width=\"1.99995\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\"></path>"
  },
  "settings": {
    "vb": "0 0 256 256",
    "inner": "<g stroke-width=\"0\" stroke-miterlimit=\"10\" fill=\"none\" transform=\"matrix(2.81 0 0 2.81 1.40659 1.40659)\"><path d=\"M34.268 90C33.599 90 32.93 89.868 32.293 89.605L22.448 85.526C21.174 84.999 20.181 84.007 19.653 82.731 19.125 81.457 19.125 80.052 19.653 78.778 20.869 75.842 19.728 73.22 18.254 71.746 16.78 70.271 14.16 69.131 11.221 70.347 9.948 70.876 8.544 70.875 7.269 70.348 5.994 69.82 5.001 68.828 4.474 67.553L0.396 57.709C-0.693 55.079 0.56 52.052 3.19 50.961 6.128 49.745 7.174 47.085 7.174 45 7.174 42.916 6.128 40.255 3.191 39.038 1.917 38.51 0.924 37.518 0.396 36.243-0.132 34.969-0.132 33.565 0.396 32.291L4.474 22.447C5.564 19.816 8.594 18.564 11.221 19.652 14.157 20.868 16.779 19.727 18.254 18.253 19.728 16.779 20.87 14.158 19.653 11.221 18.563 8.59 19.817 5.564 22.448 4.474L32.292 0.397C33.566-0.131 34.97-0.131 36.245 0.397 37.52 0.925 38.513 1.918 39.04 3.193 40.256 6.129 42.917 7.175 45.002 7.175 47.087 7.175 49.747 6.129 50.964 3.192 52.054 0.561 55.079-0.693 57.712 0.397L67.557 4.474C68.831 5.002 69.824 5.994 70.352 7.269 70.879 8.543 70.879 9.948 70.351 11.222 69.134 14.158 70.277 16.779 71.75 18.253 73.225 19.727 75.847 20.868 78.782 19.652 80.059 19.124 81.462 19.125 82.735 19.652 84.01 20.18 85.003 21.173 85.531 22.448L89.608 32.291C90.697 34.922 89.443 37.949 86.813 39.038 83.876 40.255 82.83 42.916 82.83 45 82.83 47.085 83.876 49.745 86.813 50.962L86.814 50.962C89.443 52.053 90.697 55.079 89.609 57.709L85.53 67.554C85.003 68.827 84.01 69.82 82.735 70.349 81.462 70.877 80.056 70.877 78.781 70.348 75.847 69.131 73.224 70.274 71.75 71.747 70.276 73.222 69.135 75.843 70.351 78.779 70.879 80.053 70.879 81.457 70.352 82.732 69.824 84.007 68.831 84.999 67.556 85.528L57.712 89.605C55.082 90.695 52.055 89.439 50.964 86.811 49.747 83.873 47.087 82.826 45.002 82.826 42.918 82.826 40.256 83.873 39.04 86.81 38.513 88.083 37.52 89.076 36.246 89.605 35.607 89.868 34.937 90 34.268 90ZM25.491 80.293 33.84 83.752C35.945 79.458 40.15 76.826 45.001 76.826 45.001 76.826 45.001 76.826 45.001 76.826 49.853 76.826 54.057 79.459 56.161 83.752L64.509 80.293C62.962 75.769 64.074 70.935 67.505 67.505 70.936 64.074 75.77 62.961 80.294 64.509L83.753 56.161C79.459 54.057 76.827 49.852 76.827 45.001 76.827 40.149 79.459 35.944 83.753 33.839L80.294 25.49C75.771 27.039 70.935 25.925 67.505 22.496 64.073 19.065 62.962 14.231 64.509 9.707L56.161 6.249C54.058 10.542 49.853 13.174 45.001 13.174 40.149 13.174 35.944 10.542 33.839 6.249L25.49 9.707C27.038 14.231 25.926 19.065 22.495 22.496 19.064 25.927 14.231 27.04 9.706 25.49L6.248 33.839C10.542 35.944 13.174 40.149 13.174 45.001 13.174 49.853 10.542 54.057 6.248 56.161L9.706 64.509C14.231 62.962 19.065 64.074 22.495 67.504 25.927 70.935 27.039 75.769 25.491 80.293ZM84.511 56.503C84.512 56.503 84.513 56.503 84.514 56.504 84.513 56.503 84.512 56.503 84.511 56.503ZM45.001 65.781C33.543 65.781 24.22 56.459 24.22 45 24.22 33.541 33.543 24.219 45.001 24.219 56.459 24.219 65.783 33.541 65.783 45 65.783 56.459 56.46 65.781 45.001 65.781ZM45.001 30.218C36.851 30.218 30.22 36.85 30.22 45 30.22 53.151 36.851 59.782 45.001 59.782 53.152 59.782 59.783 53.151 59.783 45 59.783 36.85 53.153 30.218 45.001 30.218Z\" class=\"MsftOfcThm_Background1_Stroke_v2 MsftOfcThm_Background1_Fill_v2\" stroke=\"currentColor\" stroke-width=\"1\" fill=\"currentColor\"></path></g>"
  },
  "mail": {
    "vb": "0 0 256 256",
    "inner": "<g stroke-width=\"0\" stroke-miterlimit=\"10\" fill=\"none\" transform=\"matrix(2.81 0 0 2.81 1.40659 1.40659)\"><path d=\"M80.89 78.772 9.11 78.772C4.087 78.772 0 74.685 0 69.662L0 20.338C0 15.315 4.087 11.228 9.11 11.228L80.89 11.228C85.913 11.228 90 15.315 90 20.338L90 69.662C90 74.686 85.913 78.772 80.89 78.772ZM9.11 17.228C7.395 17.228 6 18.624 6 20.338L6 69.662C6 71.377 7.395 72.772 9.11 72.772L80.89 72.772C82.605 72.772 84 71.376 84 69.662L84 20.338C84 18.623 82.604 17.228 80.89 17.228L9.11 17.228Z\" class=\"MsftOfcThm_Background1_Fill_v2\" stroke-width=\"1\" fill=\"currentColor\"></path><path d=\"M45 55.427C39.592 55.427 34.401 53.135 30.758 49.139L2.493 18.125 6.928 14.083 35.193 45.096C37.738 47.888 41.221 49.427 45 49.427 48.779 49.427 52.262 47.889 54.808 45.096L83.074 14.083 87.508 18.125 59.241 49.138C55.599 53.135 50.408 55.427 45 55.427Z\" class=\"MsftOfcThm_Background1_Fill_v2\" stroke-width=\"1\" fill=\"currentColor\"></path><rect x=\"-0.96\" y=\"57.16\" rx=\"0\" ry=\"0\" width=\"38.98\" height=\"6\" class=\"MsftOfcThm_Background1_Fill_v2\" stroke-width=\"1\" fill=\"currentColor\" transform=\"matrix(0.7053 -0.7089 0.7089 0.7053 -37.1881 30.8639)\"></rect><rect x=\"68.47\" y=\"40.67\" rx=\"0\" ry=\"0\" width=\"6\" height=\"38.98\" class=\"MsftOfcThm_Background1_Fill_v2\" stroke-width=\"1\" fill=\"currentColor\" transform=\"matrix(0.709 -0.7053 0.7053 0.709 -21.628 67.9146)\"></rect></g>"
  },
  "bell": {
    "vb": "0 0 256 256",
    "inner": "<g stroke-width=\"0\" stroke-miterlimit=\"10\" fill=\"none\" transform=\"matrix(2.81 0 0 2.81 1.40659 1.40659)\"><path d=\"M73.07 79.046 16.929 79.046C13.706 79.046 11.084 76.424 11.084 73.201 11.084 69.702 12.61 66.392 15.27 64.121 16.593 62.99 17.353 61.344 17.353 59.602L17.353 38.949C17.353 23.704 29.755 11.302 45 11.302 60.245 11.302 72.647 23.704 72.647 38.949L72.647 59.602C72.647 61.343 73.406 62.991 74.729 64.121 77.389 66.392 78.916 69.702 78.916 73.201 78.916 76.424 76.294 79.046 73.07 79.046ZM17.086 73.046 72.914 73.046C72.87 71.362 72.117 69.78 70.833 68.684 68.173 66.412 66.647 63.102 66.647 59.603L66.647 38.949C66.647 27.013 56.936 17.302 45 17.302 33.064 17.302 23.353 27.013 23.353 38.949L23.353 59.602C23.353 63.1 21.828 66.41 19.167 68.683 17.883 69.78 17.13 71.362 17.086 73.046Z\" stroke-width=\"1\" fill=\"currentColor\"></path><path d=\"M45 90C37.344 90 31.116 83.771 31.116 76.116 31.116 76.052 31.119 75.963 31.124 75.889 31.207 74.278 32.546 72.987 34.183 73.046 35.839 73.08 37.154 74.451 37.12 76.108 37.12 76.131 37.119 76.16 37.117 76.189 37.155 80.503 40.677 84 45 84 49.329 84 52.854 80.493 52.884 76.171 52.882 76.126 52.881 76.08 52.881 76.046 52.881 74.389 54.224 73.046 55.881 73.046 57.504 73.046 58.826 74.336 58.879 75.946 58.882 76.003 58.884 76.07 58.884 76.116 58.884 83.771 52.655 90 45 90Z\" stroke-width=\"1\" fill=\"currentColor\"></path><path d=\"M45 17.305C40.229 17.305 36.348 13.423 36.348 8.652 36.348 3.881 40.229 0 45 0 49.771 0 53.652 3.881 53.652 8.652 53.652 13.423 49.771 17.305 45 17.305ZM45 6C43.538 6 42.348 7.19 42.348 8.652 42.348 10.115 43.538 11.305 45 11.305 46.463 11.305 47.652 10.115 47.652 8.652 47.652 7.19 46.463 6 45 6Z\" stroke-width=\"1\" fill=\"currentColor\"></path><path d=\"M83.517 41.949C81.86 41.949 80.517 40.606 80.517 38.949 80.517 25.709 73.224 13.656 61.484 7.492 60.017 6.722 59.452 4.908 60.222 3.441 60.992 1.975 62.803 1.41 64.273 2.179 77.994 9.383 86.517 23.471 86.517 38.949 86.517 40.606 85.174 41.949 83.517 41.949Z\" stroke-width=\"1\" fill=\"currentColor\"></path><path d=\"M6.483 41.949C4.826 41.949 3.483 40.606 3.483 38.949 3.483 23.472 12.006 9.384 25.726 2.18 27.191 1.41 29.007 1.975 29.777 3.442 30.547 4.909 29.982 6.723 28.515 7.493 16.776 13.656 9.483 25.709 9.483 38.949 9.483 40.606 8.14 41.949 6.483 41.949Z\" stroke-width=\"1\" fill=\"currentColor\"></path></g>"
  },
  "close": {
    "vb": "0 0 256 256",
    "inner": "<g stroke-width=\"0\" stroke-miterlimit=\"10\" fill=\"none\" transform=\"matrix(2.81 0 0 2.81 1.40659 1.40659)\"><rect x=\"-9.61\" y=\"35.97\" rx=\"0\" ry=\"0\" width=\"109.22\" height=\"18.05\" class=\"MsftOfcThm_Background1_Fill_v2\" stroke-width=\"1\" fill=\"currentColor\" transform=\"matrix(0.7071 -0.7071 0.7071 0.7071 -18.6396 44.9976)\"></rect><rect x=\"35.97\" y=\"-9.61\" rx=\"0\" ry=\"0\" width=\"18.05\" height=\"109.22\" class=\"MsftOfcThm_Background1_Fill_v2\" stroke-width=\"1\" fill=\"currentColor\" transform=\"matrix(0.7071 -0.7071 0.7071 0.7071 -18.6396 44.9996)\"></rect></g>"
  },
  "chevron-right": {
    "vb": "0 0 256 256",
    "inner": "<g stroke-width=\"0\" stroke-miterlimit=\"10\" fill=\"none\" transform=\"matrix(2.81 0 0 2.81 1.40659 1.40659)\"><path d=\"M69.52 45 30.25 90 20.48 81.48 52.31 45 20.48 8.52 30.25 0Z\" stroke-width=\"1\" fill=\"currentColor\"></path></g>"
  },
  "chevron-down": {
    "vb": "0 0 256 256",
    "inner": "<g transform=\"rotate(90 128 128)\"><g stroke-width=\"0\" stroke-miterlimit=\"10\" fill=\"none\" transform=\"matrix(2.81 0 0 2.81 1.40659 1.40659)\"><path d=\"M69.52 45 30.25 90 20.48 81.48 52.31 45 20.48 8.52 30.25 0Z\" stroke-width=\"1\" fill=\"currentColor\"></path></g></g>"
  },
  "chevron-left": {
    "vb": "0 0 256 256",
    "inner": "<g transform=\"rotate(180 128 128)\"><g stroke-width=\"0\" stroke-miterlimit=\"10\" fill=\"none\" transform=\"matrix(2.81 0 0 2.81 1.40659 1.40659)\"><path d=\"M69.52 45 30.25 90 20.48 81.48 52.31 45 20.48 8.52 30.25 0Z\" stroke-width=\"1\" fill=\"currentColor\"></path></g></g>"
  },
  "chevron-up": {
    "vb": "0 0 256 256",
    "inner": "<g transform=\"rotate(270 128 128)\"><g stroke-width=\"0\" stroke-miterlimit=\"10\" fill=\"none\" transform=\"matrix(2.81 0 0 2.81 1.40659 1.40659)\"><path d=\"M69.52 45 30.25 90 20.48 81.48 52.31 45 20.48 8.52 30.25 0Z\" stroke-width=\"1\" fill=\"currentColor\"></path></g></g>"
  },
  "plus": {
    "vb": "0 0 90 90",
    "inner": "<g fill=\"currentColor\"><rect x=\"41\" y=\"8\" width=\"8\" height=\"74\" rx=\"4\"/><rect x=\"8\" y=\"41\" width=\"74\" height=\"8\" rx=\"4\"/></g>"
  },
  "calendar": {
    "vb": "0 0 90 90",
    "inner": "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"6\" stroke-linejoin=\"round\"><rect x=\"8\" y=\"16\" width=\"74\" height=\"66\" rx=\"8\"/><path d=\"M8 34 H82\" stroke-width=\"6\"/><path d=\"M26 8 V22 M64 8 V22\" stroke-linecap=\"round\"/></g>"
  },
  "filter": {
    "vb": "0 0 90 90",
    "inner": "<path fill=\"currentColor\" d=\"M10 16 H80 a4 4 0 0 1 3 6.6 L56 52 V78 a4 4 0 0 1-6 3.5 L38 74 a4 4 0 0 1-2-3.5 V52 L7 22.6 A4 4 0 0 1 10 16 Z\"/>"
  }
};
const iconNames = Object.keys(ICONS);
function Icon({
  name = "chevron-right",
  size = "1em",
  title,
  style,
  className,
  ...rest
}) {
  const def = ICONS[name] || ICONS["chevron-right"];
  const px = typeof size === "number" ? size + "px" : size;
  return /*#__PURE__*/React.createElement("svg", _extends({
    role: title ? "img" : "presentation",
    "aria-hidden": title ? undefined : true,
    "aria-label": title,
    viewBox: def.vb,
    width: px,
    height: px,
    className: className,
    style: {
      display: "inline-block",
      flex: "none",
      verticalAlign: "-0.125em",
      fill: "currentColor",
      ...style
    },
    dangerouslySetInnerHTML: {
      __html: (title ? "<title>" + title + "</title>" : "") + def.inner
    }
  }, rest));
}
Object.assign(__ds_scope, { iconNames, Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * CFE Button — the primary action control.
 * Navy primary / tinted secondary / outline / ghost / danger, plus a rare
 * gradient accent. Optional brand icon on either side, or a trailing chevron
 * (the brand's signature affordance).
 */
function Button({
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  chevron = false,
  fullWidth = false,
  disabled = false,
  type = "button",
  as = "button",
  style,
  children,
  ...rest
}) {
  const heights = {
    sm: "var(--control-height-sm)",
    md: "var(--control-height)",
    lg: "46px"
  };
  const padding = {
    sm: "0 12px",
    md: "0 16px",
    lg: "0 22px"
  };
  const fontSize = {
    sm: "var(--fs-body)",
    md: "var(--fs-h6)",
    lg: "var(--fs-h5)"
  };
  const iconSize = {
    sm: 14,
    md: 16,
    lg: 18
  };
  const variants = {
    primary: {
      background: "var(--cfe-navy)",
      color: "var(--text-on-dark)",
      border: "1px solid var(--cfe-navy)"
    },
    secondary: {
      background: "var(--cfe-navy-05)",
      color: "var(--text-primary)",
      border: "1px solid var(--cfe-navy-05)"
    },
    outline: {
      background: "var(--color-surface)",
      color: "var(--text-primary)",
      border: "1px solid var(--border-strong)"
    },
    ghost: {
      background: "transparent",
      color: "var(--text-primary)",
      border: "1px solid transparent"
    },
    danger: {
      background: "var(--cfe-danger)",
      color: "var(--text-on-dark)",
      border: "1px solid var(--cfe-danger)"
    },
    gradient: {
      background: "var(--cfe-gradient)",
      color: "var(--cfe-navy)",
      border: "1px solid transparent"
    }
  };
  const v = variants[variant] || variants.primary;
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    type: Tag === "button" ? type : undefined,
    disabled: Tag === "button" ? disabled : undefined,
    "aria-disabled": disabled || undefined,
    className: "cfe-btn",
    "data-variant": variant,
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      width: fullWidth ? "100%" : undefined,
      height: heights[size],
      padding: padding[size],
      fontFamily: "var(--font-sans)",
      fontSize: fontSize[size],
      fontWeight: "var(--fw-semibold)",
      lineHeight: 1,
      textDecoration: "none",
      whiteSpace: "nowrap",
      borderRadius: "var(--radius-sm)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      transition: "filter var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard)",
      ...v,
      ...style
    },
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = "translateY(1px)";
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = "translateY(0)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.filter = "none";
      e.currentTarget.style.boxShadow = "none";
    },
    onMouseEnter: e => {
      if (!disabled) e.currentTarget.style.filter = variant === "ghost" || variant === "outline" ? "brightness(0.97)" : "brightness(1.1)";
    },
    onFocus: e => {
      e.currentTarget.style.boxShadow = "var(--shadow-focus)";
    },
    onBlur: e => {
      e.currentTarget.style.boxShadow = "none";
    }
  }, rest), iconLeft && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconLeft,
    size: iconSize[size]
  }), children && /*#__PURE__*/React.createElement("span", null, children), iconRight && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconRight,
    size: iconSize[size]
  }), chevron && !iconRight && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-right",
    size: iconSize[size]
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * CFE IconButton — a compact square (or round) control carrying a single brand
 * icon. Used for date steppers, "add" (+) actions, table-header tools and the
 * circular chevron affordance on content cards.
 */
function IconButton({
  icon = "plus",
  variant = "primary",
  size = "md",
  shape = "square",
  label,
  disabled = false,
  type = "button",
  style,
  ...rest
}) {
  const dims = {
    sm: 30,
    md: 38,
    lg: 46
  };
  const iconSize = {
    sm: 14,
    md: 18,
    lg: 20
  };
  const variants = {
    primary: {
      background: "var(--cfe-navy)",
      color: "var(--text-on-dark)",
      border: "1px solid var(--cfe-navy)"
    },
    secondary: {
      background: "var(--cfe-navy-05)",
      color: "var(--text-primary)",
      border: "1px solid var(--cfe-navy-05)"
    },
    outline: {
      background: "var(--color-surface)",
      color: "var(--text-primary)",
      border: "1px solid var(--border-strong)"
    },
    ghost: {
      background: "transparent",
      color: "var(--text-primary)",
      border: "1px solid transparent"
    }
  };
  const v = variants[variant] || variants.primary;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    "aria-label": label,
    title: label,
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: dims[size],
      height: dims[size],
      flex: "none",
      borderRadius: shape === "round" ? "var(--radius-pill)" : "var(--radius-sm)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      transition: "filter var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)",
      ...v,
      ...style
    },
    onMouseEnter: e => {
      if (!disabled) e.currentTarget.style.filter = variant === "primary" || variant === "secondary" ? "brightness(1.1)" : "brightness(0.97)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.filter = "none";
      e.currentTarget.style.boxShadow = "none";
    },
    onFocus: e => {
      e.currentTarget.style.boxShadow = "var(--shadow-focus)";
    },
    onBlur: e => {
      e.currentTarget.style.boxShadow = "none";
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: iconSize[size]
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * CFE Card / Panel.
 *  - "panel" (default): white surface, soft shadow — the application dashboard panel.
 *  - "dark": navy surface with white text — brand content card.
 *  - "tint": light navy-05 surface — secondary brand content card.
 * Pass `chevron` to add the brand's circular chevron affordance bottom-right.
 */
function Card({
  variant = "panel",
  title,
  headerRight,
  chevron = false,
  onChevron,
  padding,
  style,
  children,
  ...rest
}) {
  const variants = {
    panel: {
      background: "var(--color-surface)",
      color: "var(--text-primary)",
      boxShadow: "var(--shadow-sm)",
      border: "1px solid var(--border)"
    },
    dark: {
      background: "var(--cfe-navy)",
      color: "var(--text-on-dark)",
      boxShadow: "none",
      border: "1px solid var(--cfe-navy)"
    },
    tint: {
      background: "var(--cfe-navy-05)",
      color: "var(--text-primary)",
      boxShadow: "none",
      border: "1px solid var(--cfe-navy-05)"
    }
  };
  const v = variants[variant] || variants.panel;
  const pad = padding != null ? padding : "var(--space-6)";
  const isContent = variant === "dark" || variant === "tint";
  return /*#__PURE__*/React.createElement("div", _extends({
    className: "cfe-card",
    "data-variant": variant,
    style: {
      position: "relative",
      borderRadius: isContent ? "var(--radius-lg)" : "var(--radius-md)",
      padding: pad,
      ...v,
      ...style
    }
  }, rest), (title || headerRight) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px",
      marginBottom: "var(--space-3)"
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--fs-h4)",
      fontWeight: "var(--fw-bold)",
      lineHeight: "var(--lh-heading)"
    }
  }, title), headerRight), children, chevron && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "chevron-right",
    shape: "round",
    variant: variant === "dark" ? "outline" : "primary",
    label: "Open",
    onClick: onChevron,
    style: variant === "dark" ? {
      background: "var(--cfe-white)",
      color: "var(--cfe-navy)",
      border: "1px solid var(--cfe-white)"
    } : undefined
  })));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/data/DataTable.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * CFE DataTable — navy header with per-column filter carets, zebra-striped rows
 * (white / navy-05), and the brand's blue link styling on linked cells.
 * Cosmetic recreation of the application grids; bring your own data.
 */
function DataTable({
  columns = [],
  rows = [],
  striped = true,
  minRows = 0,
  style,
  ...rest
}) {
  const blanks = Math.max(0, minRows - rows.length);
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      border: "1px solid var(--cfe-navy)",
      borderRadius: "var(--radius-sm)",
      overflow: "hidden",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: "var(--fs-h6)"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: "var(--cfe-navy)"
    }
  }, columns.map(c => /*#__PURE__*/React.createElement("th", {
    key: c.key,
    style: {
      textAlign: "left",
      padding: "10px 12px",
      color: "var(--text-on-dark)",
      fontWeight: "var(--fw-semibold)",
      whiteSpace: "nowrap",
      width: c.width
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      gap: "10px"
    }
  }, c.header, c.filterable !== false && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 18,
      height: 16,
      borderRadius: 3,
      background: "rgba(255,255,255,0.16)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 9,
    style: {
      color: "#fff"
    }
  }))))))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, ri) => /*#__PURE__*/React.createElement("tr", {
    key: ri,
    style: {
      background: striped && ri % 2 ? "var(--cfe-navy-05)" : "var(--color-surface)"
    }
  }, columns.map(c => /*#__PURE__*/React.createElement("td", {
    key: c.key,
    style: {
      padding: "9px 12px",
      borderTop: "1px solid var(--border)",
      color: c.link ? "var(--text-link)" : "var(--text-primary)",
      fontWeight: c.link ? "var(--fw-medium)" : "var(--fw-regular)",
      whiteSpace: "nowrap"
    }
  }, c.render ? c.render(r[c.key], r) : r[c.key])))), Array.from({
    length: blanks
  }).map((_, i) => /*#__PURE__*/React.createElement("tr", {
    key: "b" + i,
    style: {
      background: striped && (rows.length + i) % 2 ? "var(--cfe-navy-05)" : "var(--color-surface)"
    }
  }, columns.map(c => /*#__PURE__*/React.createElement("td", {
    key: c.key,
    style: {
      padding: "9px 12px",
      borderTop: "1px solid var(--border)",
      height: 18
    }
  })))))));
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/data/KpiStat.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * CFE KpiStat — the dashboard KPI tile: a label, a large value (optionally with
 * a unit), an optional delta chip, and an optional two-tone progress bar
 * (as used for Availability / Performance / Quality).
 */
function KpiStat({
  label,
  value,
  unit,
  delta,
  deltaTone = "success",
  percent,
  barColor = "var(--cfe-cyan)",
  align = "left",
  style,
  ...rest
}) {
  const toneColor = {
    success: "var(--cfe-teal-deep)",
    danger: "var(--cfe-danger)",
    neutral: "var(--text-secondary)"
  }[deltaTone];
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      textAlign: align,
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--fs-h6)",
      fontWeight: "var(--fw-medium)",
      color: "var(--text-secondary)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "8px",
      justifyContent: align === "right" ? "flex-end" : align === "center" ? "center" : "flex-start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-agenda)",
      lineHeight: 1,
      fontWeight: "var(--fw-bold)",
      color: "var(--text-primary)",
      letterSpacing: "var(--ls-tight)"
    }
  }, value), unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-h3)",
      fontWeight: "var(--fw-semibold)",
      color: "var(--text-secondary)"
    }
  }, unit), delta != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-h6)",
      fontWeight: "var(--fw-semibold)",
      color: toneColor
    }
  }, delta)), percent != null && /*#__PURE__*/React.createElement("div", {
    style: {
      height: 8,
      borderRadius: "var(--radius-pill)",
      background: "var(--cfe-navy)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: Math.max(0, Math.min(100, percent)) + "%",
      height: "100%",
      background: barColor,
      borderRadius: "var(--radius-pill)"
    }
  })));
}
Object.assign(__ds_scope, { KpiStat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/KpiStat.jsx", error: String((e && e.message) || e) }); }

// components/data/MetricBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * CFE MetricBar — the OEE-breakdown split bar. A full-width two-tone bar split
 * at `percent`, with a left and right label/value pair above (left in the fill
 * colour, right in navy). Mirrors "Running time / Downtime", "Total / Planned
 * output", etc.
 */
function MetricBar({
  leftLabel,
  leftValue,
  rightLabel,
  rightValue,
  percent = 50,
  fill = "var(--cfe-cyan)",
  track = "var(--cfe-navy)",
  showPercent = true,
  style,
  ...rest
}) {
  const p = Math.max(0, Math.min(100, percent));
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginBottom: "6px"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--fs-caption)",
      fontWeight: "var(--fw-semibold)",
      color: "var(--text-secondary)"
    }
  }, leftLabel), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--fs-h5)",
      fontWeight: "var(--fw-semibold)",
      color: "var(--text-primary)"
    }
  }, leftValue)), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--fs-caption)",
      fontWeight: "var(--fw-semibold)",
      color: "var(--text-secondary)"
    }
  }, rightLabel), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--fs-h5)",
      fontWeight: "var(--fw-semibold)",
      color: "var(--text-primary)"
    }
  }, rightValue))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 18,
      borderRadius: "var(--radius-xs)",
      background: track,
      overflow: "hidden",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: p + "%",
      background: fill,
      height: "100%"
    }
  }), showPercent && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 8,
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: "var(--fs-caption)",
      fontWeight: "var(--fw-bold)",
      color: "var(--cfe-navy)"
    }
  }, p.toFixed(1), "%"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: 8,
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: "var(--fs-caption)",
      fontWeight: "var(--fw-bold)",
      color: "#fff"
    }
  }, (100 - p).toFixed(1), "%"))));
}
Object.assign(__ds_scope, { MetricBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/MetricBar.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Alert.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * CFE Alert — inline status message (e.g. "OEE Below Target! (85.0%)").
 * Left accent bar + soft tint, in the brand semantic colours.
 */
function Alert({
  tone = "warning",
  title,
  style,
  children,
  ...rest
}) {
  const map = {
    info: {
      c: "var(--cfe-blue)",
      bg: "#EAF4FC"
    },
    success: {
      c: "var(--cfe-teal-deep)",
      bg: "#E4F4EF"
    },
    warning: {
      c: "#B5531F",
      bg: "#FCEEE3"
    },
    danger: {
      c: "var(--cfe-danger)",
      bg: "#FCE7E8"
    }
  };
  const t = map[tone] || map.warning;
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "status",
    style: {
      display: "flex",
      gap: "12px",
      padding: "12px 16px",
      borderRadius: "var(--radius-sm)",
      background: t.bg,
      borderLeft: "4px solid " + t.c,
      color: "var(--text-primary)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-h6)",
      lineHeight: "var(--lh-body)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      color: t.c,
      fontWeight: "var(--fw-bold)",
      flex: "none"
    }
  }, "!"), /*#__PURE__*/React.createElement("div", null, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: "var(--fw-semibold)",
      marginBottom: children ? "2px" : 0
    }
  }, title), children && /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--text-secondary)"
    }
  }, children)));
}
Object.assign(__ds_scope, { Alert });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Alert.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * CFE Badge — compact status / count label. Soft (default) or solid fill in
 * the brand semantic colours.
 */
function Badge({
  tone = "neutral",
  solid = false,
  size = "md",
  style,
  children,
  ...rest
}) {
  const map = {
    neutral: {
      c: "var(--cfe-navy-60)",
      bg: "var(--cfe-navy-05)"
    },
    info: {
      c: "var(--cfe-blue)",
      bg: "#E1F0FB"
    },
    success: {
      c: "var(--cfe-teal-deep)",
      bg: "#DBF1EA"
    },
    warning: {
      c: "#B5531F",
      bg: "#FCE9DC"
    },
    danger: {
      c: "var(--cfe-danger)",
      bg: "#FBE0E1"
    },
    cyan: {
      c: "#0A6E8C",
      bg: "#D8F2FB"
    }
  };
  const t = map[tone] || map.neutral;
  const pad = size === "sm" ? "2px 8px" : "3px 10px";
  const fs = size === "sm" ? "var(--fs-caption)" : "var(--fs-body)";
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      padding: pad,
      fontFamily: "var(--font-sans)",
      fontSize: fs,
      fontWeight: "var(--fw-semibold)",
      lineHeight: 1.4,
      borderRadius: "var(--radius-pill)",
      whiteSpace: "nowrap",
      color: solid ? "var(--text-on-dark)" : t.c,
      background: solid ? t.c : t.bg,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Badge.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** CFE Checkbox — square control with navy fill + white check when selected. */
function Checkbox({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  id,
  style,
  ...rest
}) {
  const cid = id || (label ? "cb-" + label.replace(/\s+/g, "-").toLowerCase() : undefined);
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: cid,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-h6)",
      color: "var(--text-primary)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: cid,
    type: "checkbox",
    checked: checked,
    defaultChecked: defaultChecked,
    onChange: onChange,
    disabled: disabled,
    style: {
      position: "absolute",
      opacity: 0,
      width: 18,
      height: 18,
      margin: 0,
      cursor: "inherit"
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    className: "cfe-checkbox-box",
    style: {
      width: 18,
      height: 18,
      borderRadius: "var(--radius-xs)",
      border: "1.5px solid var(--border-strong)",
      background: "var(--color-surface)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background var(--dur-fast), border-color var(--dur-fast)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 12 12",
    style: {
      opacity: 0
    },
    className: "cfe-checkbox-tick"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 6.2 5 9 10 3",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })))), label && /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement("style", null, `
        .cfe-checkbox-box:has(+ *) {}
        input[type=checkbox]:checked + .cfe-checkbox-box { background: var(--cfe-navy); border-color: var(--cfe-navy); }
        input[type=checkbox]:checked + .cfe-checkbox-box .cfe-checkbox-tick { opacity: 1; }
        input[type=checkbox]:focus-visible + .cfe-checkbox-box { box-shadow: var(--shadow-focus); }
      `));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * CFE Input — outlined text field with the brand's perched label sitting on the
 * top border (as seen across the registration screens). Required fields show a
 * trailing asterisk; error state turns the border and label red.
 */
function Input({
  label,
  required = false,
  error,
  hint,
  type = "text",
  disabled = false,
  rightSlot,
  id,
  style,
  ...rest
}) {
  const inputId = id || (label ? "in-" + label.replace(/\s+/g, "-").toLowerCase() : undefined);
  const borderColor = error ? "var(--cfe-danger)" : "var(--border-strong)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      height: "var(--control-height)",
      padding: "0 12px",
      background: disabled ? "var(--color-surface-sunken)" : "var(--color-surface)",
      border: "1px solid " + borderColor,
      borderRadius: "var(--radius-sm)",
      transition: "border-color var(--dur-fast), box-shadow var(--dur-fast)"
    },
    onFocusCapture: e => {
      if (!error) e.currentTarget.style.boxShadow = "var(--shadow-focus)";
      e.currentTarget.style.borderColor = error ? "var(--cfe-danger)" : "var(--cfe-cyan)";
    },
    onBlurCapture: e => {
      e.currentTarget.style.boxShadow = "none";
      e.currentTarget.style.borderColor = borderColor;
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      position: "absolute",
      top: "-8px",
      left: "10px",
      padding: "0 4px",
      background: "var(--color-surface)",
      fontSize: "var(--fs-caption)",
      fontWeight: "var(--fw-medium)",
      color: error ? "var(--cfe-danger)" : "var(--text-secondary)",
      pointerEvents: "none"
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--cfe-danger)"
    }
  }, " *")), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: type,
    disabled: disabled,
    "aria-invalid": !!error,
    style: {
      flex: 1,
      minWidth: 0,
      border: "none",
      outline: "none",
      background: "transparent",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-h6)",
      color: "var(--text-primary)"
    }
  }, rest)), rightSlot), (error || hint) && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "4px",
      fontSize: "var(--fs-caption)",
      color: error ? "var(--cfe-danger)" : "var(--text-secondary)"
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * CFE Select — outlined dropdown matching Input's perched-label treatment, with
 * a trailing brand caret and an optional clear affordance.
 */
function Select({
  label,
  required = false,
  options = [],
  placeholder = "Select…",
  value,
  onChange,
  clearable = false,
  error,
  disabled = false,
  id,
  style,
  ...rest
}) {
  const selId = id || (label ? "sel-" + label.replace(/\s+/g, "-").toLowerCase() : undefined);
  const borderColor = error ? "var(--cfe-danger)" : "var(--border-strong)";
  const hasValue = value !== undefined && value !== null && value !== "";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: "var(--control-height)",
      background: disabled ? "var(--color-surface-sunken)" : "var(--color-surface)",
      border: "1px solid " + borderColor,
      borderRadius: "var(--radius-sm)"
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: selId,
    style: {
      position: "absolute",
      top: "-8px",
      left: "10px",
      padding: "0 4px",
      background: "var(--color-surface)",
      fontSize: "var(--fs-caption)",
      fontWeight: "var(--fw-medium)",
      color: error ? "var(--cfe-danger)" : "var(--text-secondary)",
      pointerEvents: "none"
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--cfe-danger)"
    }
  }, " *")), /*#__PURE__*/React.createElement("select", _extends({
    id: selId,
    value: value,
    onChange: onChange,
    disabled: disabled,
    "aria-invalid": !!error,
    style: {
      width: "100%",
      height: "100%",
      padding: "0 56px 0 12px",
      border: "none",
      outline: "none",
      background: "transparent",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-h6)",
      color: hasValue ? "var(--text-primary)" : "var(--text-muted)",
      appearance: "none",
      WebkitAppearance: "none",
      cursor: disabled ? "not-allowed" : "pointer"
    }
  }, rest), placeholder && /*#__PURE__*/React.createElement("option", {
    value: ""
  }, placeholder), options.map(o => {
    const v = typeof o === "string" ? o : o.value;
    const l = typeof o === "string" ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      right: 0,
      height: "100%",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      padding: "0 10px",
      pointerEvents: "none"
    }
  }, clearable && hasValue && /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Clear",
    onClick: () => onChange && onChange({
      target: {
        value: ""
      }
    }),
    style: {
      pointerEvents: "auto",
      display: "inline-flex",
      border: "none",
      background: "transparent",
      color: "var(--text-muted)",
      cursor: "pointer",
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "close",
    size: 12
  })), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 14,
    style: {
      color: "var(--text-secondary)"
    }
  }))), error && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "4px",
      fontSize: "var(--fs-caption)",
      color: "var(--cfe-danger)"
    }
  }, error));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** CFE Switch — pill toggle; navy track when on. */
function Switch({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  id,
  style,
  ...rest
}) {
  const sid = id || (label ? "sw-" + label.replace(/\s+/g, "-").toLowerCase() : undefined);
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: sid,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-h6)",
      color: "var(--text-primary)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: sid,
    type: "checkbox",
    role: "switch",
    checked: checked,
    defaultChecked: defaultChecked,
    onChange: onChange,
    disabled: disabled,
    style: {
      position: "absolute",
      opacity: 0,
      width: 40,
      height: 22,
      margin: 0,
      cursor: "inherit"
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    className: "cfe-switch-track",
    style: {
      width: 40,
      height: 22,
      borderRadius: "var(--radius-pill)",
      background: "var(--cfe-navy-20)",
      display: "inline-block",
      position: "relative",
      transition: "background var(--dur-base) var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "cfe-switch-thumb",
    style: {
      position: "absolute",
      top: 2,
      left: 2,
      width: 18,
      height: 18,
      borderRadius: "50%",
      background: "#fff",
      boxShadow: "var(--shadow-xs)",
      transition: "transform var(--dur-base) var(--ease-standard)"
    }
  }))), label && /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement("style", null, `
        input[role=switch]:checked + .cfe-switch-track { background: var(--cfe-navy); }
        input[role=switch]:checked + .cfe-switch-track .cfe-switch-thumb { transform: translateX(18px); }
        input[role=switch]:focus-visible + .cfe-switch-track { box-shadow: var(--shadow-focus); }
      `));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * CFE Tabs — section navigation. "underline" tabs (active gets a gradient
 * underline) or "pill" filter chips (active = navy). Used for the application's
 * filter rows and view switchers.
 */
function Tabs({
  items = [],
  value,
  onChange,
  variant = "underline",
  style,
  ...rest
}) {
  const active = value != null ? value : items[0] && (typeof items[0] === "string" ? items[0] : items[0].value);
  const norm = items.map(i => typeof i === "string" ? {
    value: i,
    label: i
  } : i);
  if (variant === "pill") {
    return /*#__PURE__*/React.createElement("div", _extends({
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
        fontFamily: "var(--font-sans)",
        ...style
      }
    }, rest), norm.map(i => {
      const on = i.value === active;
      return /*#__PURE__*/React.createElement("button", {
        key: i.value,
        type: "button",
        onClick: () => onChange && onChange(i.value),
        style: {
          height: "var(--control-height-sm)",
          padding: "0 16px",
          borderRadius: "var(--radius-pill)",
          fontFamily: "var(--font-sans)",
          fontSize: "var(--fs-body)",
          fontWeight: "var(--fw-semibold)",
          cursor: "pointer",
          transition: "background var(--dur-fast), color var(--dur-fast)",
          background: on ? "var(--cfe-navy)" : "var(--cfe-navy-05)",
          color: on ? "var(--text-on-dark)" : "var(--text-secondary)",
          border: "1px solid " + (on ? "var(--cfe-navy)" : "transparent")
        }
      }, i.label);
    }));
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      gap: "4px",
      borderBottom: "1px solid var(--border)",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, rest), norm.map(i => {
    const on = i.value === active;
    return /*#__PURE__*/React.createElement("button", {
      key: i.value,
      type: "button",
      onClick: () => onChange && onChange(i.value),
      style: {
        position: "relative",
        padding: "10px 14px 12px",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--fs-h6)",
        fontWeight: on ? "var(--fw-semibold)" : "var(--fw-medium)",
        color: on ? "var(--text-primary)" : "var(--text-secondary)"
      }
    }, i.label, /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        left: 8,
        right: 8,
        bottom: -1,
        height: 3,
        borderRadius: "var(--radius-pill)",
        background: on ? "var(--cfe-gradient)" : "transparent"
      }
    }));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mom-dashboard/AppShell.jsx
try { (() => {
/* CFE MOM — application shell: navy header (logo, scope search, nav icons) + footer.
   Pulls primitives from the compiled design-system bundle. */
const {
  Icon,
  IconButton,
  Input
} = window.CFEDesignSystem_1ee1e2;
function AppHeader({
  appName = "Manufacturing Operations",
  onMenu
}) {
  const navIcons = ["bell", "mail", "settings"];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      height: "var(--header-height)",
      flex: "none",
      background: "var(--cfe-navy-deep)",
      display: "flex",
      alignItems: "center",
      gap: "20px",
      padding: "0 20px",
      color: "#fff",
      position: "sticky",
      top: 0,
      zIndex: 20
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onMenu,
    "aria-label": "Menu",
    style: {
      background: "transparent",
      border: "none",
      color: "#fff",
      display: "inline-flex",
      cursor: "pointer",
      padding: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "menu",
    size: 20
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 36,
      height: 36,
      background: "#fff",
      borderRadius: 9,
      padding: 5,
      boxSizing: "border-box"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/hexagon-cfe-green.jpg",
    alt: "CFE",
    style: {
      height: "100%",
      width: "auto",
      objectFit: "contain"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 21,
      fontWeight: 700,
      letterSpacing: ".05em",
      color: "#fff"
    }
  }, "CFE")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 28,
      background: "rgba(255,255,255,.18)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--fs-h6)",
      fontWeight: 600,
      letterSpacing: ".02em",
      color: "#cdd8e8"
    }
  }, appName), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      height: 36,
      padding: "0 12px",
      background: "rgba(255,255,255,.08)",
      borderRadius: "var(--radius-pill)",
      border: "1px solid rgba(255,255,255,.14)",
      width: 280,
      maxWidth: "32vw"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 15,
    style: {
      color: "#9fb0c8"
    }
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "Type your search here",
    style: {
      flex: 1,
      minWidth: 0,
      background: "transparent",
      border: "none",
      outline: "none",
      color: "#fff",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-h6)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4
    }
  }, navIcons.map(n => /*#__PURE__*/React.createElement("button", {
    key: n,
    "aria-label": n,
    style: {
      position: "relative",
      background: "transparent",
      border: "none",
      color: "#cdd8e8",
      cursor: "pointer",
      padding: 8,
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: n,
    size: 18
  }), n === "bell" && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 6,
      right: 7,
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: "var(--cfe-cyan)",
      border: "1.5px solid var(--cfe-navy-deep)"
    }
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 32,
      height: 32,
      borderRadius: "50%",
      background: "var(--cfe-gradient)",
      color: "var(--cfe-navy)",
      marginLeft: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "user",
    size: 18
  }))));
}
function AppFooter() {
  const cols = [["Onze oplossingen", ["Gebouwtechnieken", "Industrial Automation", "Energy & Utilities"]], ["Application", ["OEE Dashboard", "Time registration", "Reporting"]]];
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      flex: "none",
      background: "var(--cfe-navy-deep)",
      color: "#cdd8e8",
      padding: "22px 28px",
      display: "flex",
      gap: 56,
      alignItems: "flex-start",
      flexWrap: "wrap"
    }
  }, cols.map(([h, items]) => /*#__PURE__*/React.createElement("div", {
    key: h,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--fs-h6)",
      fontWeight: 700,
      color: "#fff"
    }
  }, h), items.map(i => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      fontSize: "var(--fs-body)"
    }
  }, i)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      fontSize: "var(--fs-body)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--fs-h6)",
      fontWeight: 700,
      color: "#fff"
    }
  }, "VMA NV"), /*#__PURE__*/React.createElement("div", null, "Kortrijksesteenweg 14b"), /*#__PURE__*/React.createElement("div", null, "9830 Sint-Martens-Latem"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--cfe-cyan)"
    }
  }, "info@vma.be")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      alignSelf: "flex-end",
      fontSize: "var(--fs-caption)",
      color: "#7e93b3"
    }
  }, "\xA9 2025 CFE \u2014 All rights reserved. \xA0\xB7\xA0 Application by VMA"));
}
window.AppHeader = AppHeader;
window.AppFooter = AppFooter;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mom-dashboard/AppShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mom-dashboard/Charts.jsx
try { (() => {
/* CFE MOM — data-viz charts (SVG): semicircular OEE gauge + OEE trendline area chart.
   Charts are bespoke SVG (appropriate for data-viz, not icons). */

function polar(cx, cy, r, deg) {
  const a = deg * Math.PI / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}
function arcPath(cx, cy, r, startDeg, endDeg) {
  const [x1, y1] = polar(cx, cy, r, startDeg);
  const [x2, y2] = polar(cx, cy, r, endDeg);
  const large = Math.abs(endDeg - startDeg) > 180 ? 1 : 0;
  const sweep = endDeg > startDeg ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} ${sweep} ${x2} ${y2}`;
}
function Gauge({
  value = 41.6,
  target = 85,
  size = 220
}) {
  const cx = size / 2,
    cy = size / 2,
    r = size / 2 - 16,
    w = 18;
  const v = Math.max(0, Math.min(100, value));
  const startA = 180,
    endA = 360; // top semicircle, left → right
  const valA = startA + (endA - startA) * (v / 100);
  const tgtA = startA + (endA - startA) * (target / 100);
  const [tx, ty] = polar(cx, cy, r, tgtA);
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size / 2 + 28,
    viewBox: `0 0 ${size} ${size / 2 + 28}`
  }, /*#__PURE__*/React.createElement("path", {
    d: arcPath(cx, cy, r, startA, endA),
    fill: "none",
    stroke: "var(--cfe-navy-05)",
    strokeWidth: w,
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: arcPath(cx, cy, r, startA, valA),
    fill: "none",
    stroke: "var(--cfe-cyan)",
    strokeWidth: w,
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("line", {
    x1: polar(cx, cy, r - w, tgtA)[0],
    y1: polar(cx, cy, r - w, tgtA)[1],
    x2: tx,
    y2: ty,
    stroke: "var(--cfe-navy)",
    strokeWidth: 2.5
  }), /*#__PURE__*/React.createElement("text", {
    x: cx,
    y: cy - 4,
    textAnchor: "middle",
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 40,
      fontWeight: 700,
      fill: "var(--cfe-navy)"
    }
  }, String(v).replace(".", ",")), /*#__PURE__*/React.createElement("text", {
    x: cx,
    y: cy + 18,
    textAnchor: "middle",
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 12,
      fontWeight: 600,
      fill: "var(--text-secondary)"
    }
  }, "OEE %"));
}
function Trendline({
  width = 560,
  height = 230
}) {
  const days = 31;
  const thisYear = [0, 0, 0, 2, 16, 64, 86, 45, 0, 44, 0, 52, 0, 0, 47, 88, 101, 89, 0, 0, 0, 57, 0, 0, 0, 90, 89, 88, 91].slice(0, days);
  while (thisYear.length < days) thisYear.push(Math.round(40 + Math.random() * 50));
  const prevYear = thisYear.map((_, i) => 88 + Math.round(Math.sin(i) * 3));
  const pad = {
    l: 28,
    r: 12,
    t: 16,
    b: 24
  };
  const W = width - pad.l - pad.r,
    H = height - pad.t - pad.b;
  const max = 120;
  const x = i => pad.l + i / (days - 1) * W;
  const y = v => pad.t + H - v / max * H;
  const line = arr => arr.map((v, i) => `${i ? "L" : "M"} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  const area = arr => `${line(arr)} L ${x(days - 1)} ${pad.t + H} L ${x(0)} ${pad.t + H} Z`;
  return /*#__PURE__*/React.createElement("svg", {
    width: "100%",
    viewBox: `0 0 ${width} ${height}`,
    style: {
      display: "block"
    }
  }, [0, 30, 60, 90, 120].map(g => /*#__PURE__*/React.createElement("g", {
    key: g
  }, /*#__PURE__*/React.createElement("line", {
    x1: pad.l,
    x2: width - pad.r,
    y1: y(g),
    y2: y(g),
    stroke: "var(--border)",
    strokeWidth: 1
  }), /*#__PURE__*/React.createElement("text", {
    x: 4,
    y: y(g) + 3,
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 9,
      fill: "var(--text-muted)"
    }
  }, g))), /*#__PURE__*/React.createElement("path", {
    d: area(prevYear),
    fill: "var(--cfe-sky)",
    opacity: 0.5
  }), /*#__PURE__*/React.createElement("path", {
    d: line(prevYear),
    fill: "none",
    stroke: "var(--cfe-cyan)",
    strokeWidth: 2
  }), /*#__PURE__*/React.createElement("path", {
    d: area(thisYear),
    fill: "var(--cfe-navy)",
    opacity: 0.18
  }), /*#__PURE__*/React.createElement("path", {
    d: line(thisYear),
    fill: "none",
    stroke: "var(--cfe-navy)",
    strokeWidth: 2
  }), thisYear.map((v, i) => /*#__PURE__*/React.createElement("circle", {
    key: i,
    cx: x(i),
    cy: y(v),
    r: 2,
    fill: "var(--cfe-navy)"
  })));
}
window.Gauge = Gauge;
window.Trendline = Trendline;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mom-dashboard/Charts.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mom-dashboard/OeeDashboard.jsx
try { (() => {
/* CFE MOM — OEE Dashboard screen. Composes DS primitives + the bespoke charts. */
const {
  Card,
  KpiStat,
  MetricBar,
  Tabs,
  Select,
  IconButton,
  Icon,
  Alert
} = window.CFEDesignSystem_1ee1e2;
function Selector({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontSize: "var(--fs-caption)",
      fontWeight: 600,
      color: "var(--cfe-cyan)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 5,
      height: 5,
      borderRadius: "50%",
      background: "var(--cfe-cyan)"
    }
  }), label), children);
}
function DateField({
  value,
  onPrev,
  onNext
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      height: 38,
      padding: "0 12px",
      background: "#fff",
      border: "1px solid var(--border-strong)",
      borderRadius: "var(--radius-sm)",
      fontSize: "var(--fs-h6)",
      color: "var(--text-primary)"
    }
  }, value, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar",
    size: 15,
    style: {
      color: "var(--text-secondary)"
    }
  })), /*#__PURE__*/React.createElement(IconButton, {
    icon: "chevron-left",
    size: "md",
    label: "Previous",
    onClick: onPrev
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "chevron-right",
    size: "md",
    label: "Next",
    onClick: onNext
  }));
}
function PanelHead({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      fontSize: "var(--fs-h4)",
      fontWeight: 700,
      marginBottom: 14
    }
  }, children);
}
function OeeDashboard() {
  const scopes = ["Enterprise + Sint-Martens-Latem + Hall 2", "Enterprise + Sint-Martens-Latem + Hall 1", "Enterprise + Kortrijk + Line A"];
  const [scope, setScope] = React.useState(scopes[0]);
  const [tab, setTab] = React.useState("This year");
  const [day, setDay] = React.useState(31);

  // scope-dependent demo figures
  const data = {
    [scopes[0]]: {
      oee: 41.6,
      a: 38.1,
      p: 109.4,
      q: 100.0,
      run: "282h 50m 48s",
      down: "461h 9m 11s",
      split: 38
    },
    [scopes[1]]: {
      oee: 62.3,
      a: 71.0,
      p: 92.4,
      q: 95.0,
      run: "402h 12m 03s",
      down: "341h 47m",
      split: 54
    },
    [scopes[2]]: {
      oee: 78.9,
      a: 86.2,
      p: 95.1,
      q: 96.2,
      run: "511h 30m",
      down: "232h 30m",
      split: 69
    }
  }[scope];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 28,
      flexWrap: "wrap",
      alignItems: "flex-end"
    }
  }, /*#__PURE__*/React.createElement(Selector, {
    label: "Scope selector"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 360,
      maxWidth: "60vw"
    }
  }, /*#__PURE__*/React.createElement(Select, {
    value: scope,
    onChange: e => setScope(e.target.value),
    options: scopes,
    placeholder: "Select scope"
  }))), /*#__PURE__*/React.createElement(Selector, {
    label: "Date selector"
  }, /*#__PURE__*/React.createElement(DateField, {
    value: `${day}/05/2025`,
    onPrev: () => setDay(d => Math.max(1, d - 1)),
    onNext: () => setDay(d => Math.min(31, d + 1))
  })), /*#__PURE__*/React.createElement(Selector, {
    label: "Period"
  }, /*#__PURE__*/React.createElement(Tabs, {
    variant: "pill",
    items: ["This month", "This year"],
    value: tab,
    onChange: setTab
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(380px, 1fr) minmax(380px, 1.2fr)",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    variant: "panel"
  }, /*#__PURE__*/React.createElement(PanelHead, null, /*#__PURE__*/React.createElement(Icon, {
    name: "settings",
    size: 18,
    style: {
      color: "var(--cfe-cyan)"
    }
  }), "% Overall Equipment Effectiveness"), data.oee < 85 && /*#__PURE__*/React.createElement(Alert, {
    tone: "warning",
    title: `OEE Below Target! (85.0%)`,
    style: {
      marginBottom: 14
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "auto 1fr",
      gap: 20,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Gauge, {
    value: data.oee
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(KpiStat, {
    label: "Availability %",
    value: String(data.a).replace(".", ","),
    percent: data.a
  }), /*#__PURE__*/React.createElement(KpiStat, {
    label: "Performance %",
    value: String(data.p).replace(".", ","),
    percent: Math.min(100, data.p),
    barColor: "var(--cfe-teal)",
    delta: "+2%"
  }), /*#__PURE__*/React.createElement(KpiStat, {
    label: "Quality %",
    value: String(data.q).replace(".", ","),
    percent: data.q,
    barColor: "var(--cfe-teal-deep)"
  })))), /*#__PURE__*/React.createElement(Card, {
    variant: "panel"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement(PanelHead, null, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 14,
    style: {
      color: "var(--cfe-cyan)"
    }
  }), "Trendline OEE (%)"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      fontSize: "var(--fs-caption)",
      color: "var(--text-secondary)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: "50%",
      background: "var(--cfe-navy)"
    }
  }), "This year"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: "50%",
      background: "var(--cfe-cyan)"
    }
  }), "Previous year"))), /*#__PURE__*/React.createElement(Trendline, null))), /*#__PURE__*/React.createElement(Card, {
    variant: "panel"
  }, /*#__PURE__*/React.createElement(PanelHead, null, /*#__PURE__*/React.createElement(Icon, {
    name: "settings",
    size: 18,
    style: {
      color: "var(--cfe-cyan)"
    }
  }), "OEE Breakdown"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 28
    }
  }, /*#__PURE__*/React.createElement(MetricBar, {
    leftLabel: "Running time",
    leftValue: data.run,
    rightLabel: "Downtime",
    rightValue: data.down,
    percent: data.split,
    fill: "var(--cfe-teal)"
  }), /*#__PURE__*/React.createElement(MetricBar, {
    leftLabel: "Total output",
    leftValue: "1.86M",
    rightLabel: "Planned output",
    rightValue: "4.46M",
    percent: 41.6,
    fill: "var(--cfe-cyan)"
  }), /*#__PURE__*/React.createElement(MetricBar, {
    leftLabel: "Good output",
    leftValue: "1.86M",
    rightLabel: "Bad output",
    rightValue: "0.00",
    percent: 100,
    fill: "var(--cfe-blue)"
  }))));
}
window.OeeDashboard = OeeDashboard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mom-dashboard/OeeDashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/registration/RegistrationApp.jsx
try { (() => {
/* CFE — Time Registration screen. Add-registration form + the day's registration grid.
   Composes DS primitives from the compiled bundle. */
const {
  Card,
  Button,
  IconButton,
  Input,
  Select,
  DataTable,
  Badge,
  Icon,
  Tabs
} = window.CFEDesignSystem_1ee1e2;
function FieldRow({
  children,
  cols = "1fr 1fr"
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: cols,
      gap: 16
    }
  }, children);
}
function RegistrationApp() {
  const [day, setDay] = React.useState(12);
  const [form, setForm] = React.useState({
    customer: "VMA",
    job: "SC",
    location: "VMA",
    project: "",
    activity: "",
    reference: "",
    description: "",
    duration: "0",
    status: "Executed"
  });
  const set = k => e => setForm(f => ({
    ...f,
    [k]: e.target.value
  }));
  const [rows, setRows] = React.useState([{
    customer: "Fromunion",
    project: "Upgrade Momentum 18.0",
    resource: "Simon Reynaert",
    hours: "3,0",
    status: "Executed"
  }, {
    customer: "Fromunion",
    project: "Upgrade Momentum 18.0",
    resource: "Andrei Pashkov",
    hours: "2,5",
    status: "Executed"
  }, {
    customer: "VMA",
    project: "SC — Internal",
    resource: "Jeroen De Cuyper",
    hours: "1,0",
    status: "Planned"
  }]);
  const total = rows.reduce((s, r) => s + parseFloat(r.hours.replace(",", ".")), 0);
  function submit(clear) {
    if (!form.project || !form.description) return;
    setRows(r => [...r, {
      customer: form.customer,
      project: form.project,
      resource: "You",
      hours: String(form.duration).replace(".", ",") || "0",
      status: form.status
    }]);
    if (clear) setForm(f => ({
      ...f,
      project: "",
      activity: "",
      reference: "",
      description: "",
      duration: "0"
    }));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      display: "grid",
      gridTemplateColumns: "minmax(420px, 1fr) minmax(380px, 0.85fr)",
      gap: 16,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    variant: "panel",
    title: "Add registration"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "flex-end",
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Select, {
    label: "Select template",
    options: ["Daily — Service call", "Weekly — Project work", "Maintenance round"],
    placeholder: "Select template"
  })), /*#__PURE__*/React.createElement(IconButton, {
    icon: "plus",
    label: "New template"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(FieldRow, {
    cols: "200px 1fr"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Date",
    value: `${String(day).padStart(2, "0")}-03-26`,
    readOnly: true,
    rightSlot: /*#__PURE__*/React.createElement(Icon, {
      name: "calendar",
      size: 15,
      style: {
        color: "var(--text-secondary)"
      }
    }),
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "chevron-left",
    label: "Previous day",
    onClick: () => setDay(d => Math.max(1, d - 1))
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "chevron-right",
    label: "Next day",
    onClick: () => setDay(d => d + 1)
  })), /*#__PURE__*/React.createElement("div", null)), /*#__PURE__*/React.createElement(FieldRow, null, /*#__PURE__*/React.createElement(Input, {
    label: "Customer",
    required: true,
    value: form.customer,
    onChange: set("customer")
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Job",
    required: true,
    value: form.job,
    onChange: set("job")
  })), /*#__PURE__*/React.createElement(FieldRow, null, /*#__PURE__*/React.createElement(Input, {
    label: "Location",
    required: true,
    value: form.location,
    onChange: set("location")
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Project",
    required: true,
    value: form.project,
    onChange: set("project"),
    placeholder: "e.g. Upgrade Momentum 18.0"
  })), /*#__PURE__*/React.createElement(FieldRow, null, /*#__PURE__*/React.createElement(Input, {
    label: "Activity",
    value: form.activity,
    onChange: set("activity")
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Reference",
    value: form.reference,
    onChange: set("reference")
  })), /*#__PURE__*/React.createElement(Input, {
    label: "Description",
    required: true,
    value: form.description,
    onChange: set("description"),
    placeholder: "What did you work on?"
  }), /*#__PURE__*/React.createElement(FieldRow, null, /*#__PURE__*/React.createElement(Input, {
    label: "Duration (already 0 / 8h today)",
    required: true,
    value: form.duration,
    onChange: set("duration")
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Activity status",
    required: true,
    clearable: true,
    value: form.status,
    onChange: set("status"),
    options: ["Executed", "Planned", "Cancelled"]
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      gap: 10,
      marginTop: 22,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    iconLeft: "chevron-left"
  }, "Return"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => submit(false)
  }, "Submit and return"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    iconLeft: "close",
    onClick: () => submit(true)
  }, "Submit and clear"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    chevron: true,
    onClick: () => submit(true)
  }, "Submit and continue"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    variant: "dark"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--fs-h6)",
      color: "rgba(255,255,255,.7)",
      fontWeight: 600
    }
  }, "Registered today"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 8,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 48,
      fontWeight: 700,
      lineHeight: 1,
      color: "#fff"
    }
  }, total.toFixed(1).replace(".", ",")), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "rgba(255,255,255,.7)"
    }
  }, "/ 8,0 h")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 8,
      borderRadius: 999,
      background: "rgba(255,255,255,.16)",
      marginTop: 14,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: Math.min(100, total / 8 * 100) + "%",
      height: "100%",
      background: "var(--cfe-gradient)"
    }
  }))), /*#__PURE__*/React.createElement(Card, {
    variant: "panel",
    title: "Day registrations",
    headerRight: /*#__PURE__*/React.createElement(Badge, {
      tone: "info"
    }, rows.length)
  }, /*#__PURE__*/React.createElement(DataTable, {
    columns: [{
      key: "project",
      header: "Project",
      link: true
    }, {
      key: "resource",
      header: "Resource"
    }, {
      key: "hours",
      header: "Hours",
      filterable: false,
      width: 64
    }, {
      key: "status",
      header: "Status",
      filterable: false,
      render: v => /*#__PURE__*/React.createElement(Badge, {
        size: "sm",
        tone: v === "Executed" ? "success" : v === "Planned" ? "info" : "neutral"
      }, v)
    }],
    rows: rows,
    minRows: 6
  }))));
}
window.RegistrationApp = RegistrationApp;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/registration/RegistrationApp.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.KpiStat = __ds_scope.KpiStat;

__ds_ns.MetricBar = __ds_scope.MetricBar;

__ds_ns.Alert = __ds_scope.Alert;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
