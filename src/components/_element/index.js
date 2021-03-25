// import Vue from 'vue'
import {
  Pagination,
  Dialog,
  // Autocomplete,
  // Dropdown,
  // DropdownMenu,
  // DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
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
  TimeSelect,
  TimePicker,
  // Popover,
  // Tooltip,
  // Breadcrumb,
  // BreadcrumbItem,
  Form,
  FormItem,
  // Tabs,
  // TabPane,
  Tag,
  Tree,
  Alert,
  Slider,
  // Icon,
  Row,
  Col,
  Upload,
  Progress,
  // Spinner,
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
  ColorPicker,
  Transfer,
  // Container,
  // Header,
  // Aside,
  // Main,
  // Footer,
  // Timeline,
  // TimelineItem,
  // Link,
  // Divider,
  // Image,
  // Calendar,
  // Backtop,
  // PageHeader,
  // CascaderPanel,
  Loading,
  MessageBox,
  Message
  // Notification
} from 'element-ui'

const element = {
  install: function (Vue) {
    Vue.use(Select)
    Vue.use(Option)
    Vue.use(OptionGroup)
    Vue.use(Input)
    Vue.use(InputNumber)
    Vue.use(Radio)
    Vue.use(Tree)
    Vue.use(Dialog)
    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Checkbox)
    Vue.use(CheckboxButton)
    Vue.use(CheckboxGroup)
    Vue.use(Cascader)
    Vue.use(Switch)
    Vue.use(Slider)
    Vue.use(TimePicker)
    Vue.use(TimeSelect)
    Vue.use(DatePicker)
    Vue.use(Upload)
    Vue.use(Rate)
    Vue.use(ColorPicker)
    Vue.use(Transfer)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(Tag)
    Vue.use(Button)
    Vue.use(Progress)
    Vue.use(Pagination)
    Vue.use(Badge)
    Vue.use(Alert)
    Vue.use(Loading)
    Vue.use(Menu)
    Vue.use(MenuItem)
    Vue.use(MenuItemGroup)
    Vue.use(Submenu)
    Vue.use(RadioGroup)
    Vue.use(RadioButton)

    Vue.prototype.$message = Message
    Vue.prototype.$confirm = MessageBox.confirm
    Vue.prototype.$alert = MessageBox.alert
    Vue.prototype.$notify = Notification
  }
}

export default element
