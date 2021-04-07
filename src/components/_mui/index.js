/**
 * 按需引入 element-ui 组件
 */
import {
  Pagination,
  Dialog,
  // Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  // MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  // CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  // ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  // TimeSelect,
  TimePicker,
  Popover,
  Tooltip,
  // Breadcrumb,
  // BreadcrumbItem,
  Form,
  FormItem,
  Timeline,
  TimelineItem,
  // Scrollbar,
  Tabs,
  TabPane,
  Tag,
  Tree,
  // Alert,
  // Slider,
  // Icon,
  // Row,
  Col,
  Upload,
  Progress,
  Badge,
  // Card,
  Rate,
  // Steps,
  // Step,
  // Carousel,
  // CarouselItem,
  // Collapse,
  // CollapseItem,
  Cascader,
  // ColorPicker,
  // Transfer,
  // Container,
  // Header,
  // Aside,
  // Main,
  // Footer,
  // Loading,
  MessageBox,
  Message
  // Notification
} from 'element-ui'

// 引入自定义组件
// import CoverUpload from '../cover-upload'
// import AliCoverUpload from '../ali-cover-upload'
// import Arrow from '../arrow'

// 组装成 mui 套件
const mui = {
  'm-rate': Rate,
  'm-radio': Radio,
  'm-radio-group': RadioGroup,
  'm-radio-button': RadioButton,
  'm-badge': Badge,
  'm-dialog': Dialog,
  'm-dropdown': Dropdown,
  'm-dropdown-menu': DropdownMenu,
  'm-dropdown-item': DropdownItem,
  'm-menu': Menu,
  'm-submenu': Submenu,
  'm-menu-item': MenuItem,
  'm-checkbox': Checkbox,
  'm-checkbox-group': CheckboxGroup,
  'm-input': Input,
  'm-input-number': InputNumber,
  'm-button': Button,
  'm-switch': Switch,
  'm-form': Form,
  'm-form-item': FormItem,
  'm-select': Select,
  'm-cascader': Cascader,
  'm-option': Option,
  'm-option-group': OptionGroup,
  'm-tabs': Tabs,
  'm-tab-pane': TabPane,
  'm-tag': Tag,
  'm-upload': Upload,
  'm-progress': Progress,
  // 'm-cover-upload': CoverUpload,
  // 'm-ali-cover-upload': AliCoverUpload,
  // 'el-scrollbar': Scrollbar,
  // 'm-row': Row,
  'm-col': Col,
  'm-table': Table,
  'm-table-column': TableColumn,
  'm-time-picker': TimePicker,
  'm-date-picker': DatePicker,
  'm-tree': Tree,
  'm-timeline': Timeline,
  'm-timeline-item': TimelineItem,
  // 'm-modal': Modal,
  'm-popover': Popover,
  'm-tooltip': Tooltip,
  'm-pagination': Pagination
  // 'm-arrow': Arrow
}

const install = function (Vue) {
  Object.keys(mui).forEach((key) => {
    Vue.component(key, mui[key])
  })

  // Object.defineProperty(Vue.prototype, '$Loading', { value: LoadingBar })
  Object.defineProperty(Vue.prototype, '$message', { value: Message })
  Object.defineProperty(Vue.prototype, '$confirm', { value: MessageBox })
  // Object.defineProperty(Vue.prototype, '$Modal', { value: Modal })
  // Object.defineProperty(Vue.prototype, '$Notice', { value: Notice })
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default Object.assign(mui, { install })
