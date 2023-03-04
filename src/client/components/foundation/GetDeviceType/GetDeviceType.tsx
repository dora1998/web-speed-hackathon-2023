import type { ReactNode } from 'react';
import { Component } from 'react';

export const DeviceType = {
  DESKTOP: 'DESKTOP',
  MOBILE: 'MOBILE',
} as const;
export type DeviceType = typeof DeviceType[keyof typeof DeviceType];

type Props = {
  children: ({ deviceType }: { deviceType: DeviceType }) => ReactNode;
};

export class GetDeviceType extends Component<Props> {
  private _timer: number | null;
  private _windowWidth: number;

  constructor(props: Props) {
    super(props);
    this._windowWidth = window.innerWidth;
    this._timer = null;
  }

  componentDidMount(): void {
    this._checkIsDesktop();
    window.addEventListener('resize', this._checkIsDesktop.bind(this));
  }

  componentWillUnmount(): void {
    window.removeEventListener('resize', this._checkIsDesktop.bind(this));
  }

  private _checkIsDesktop() {
    this._windowWidth = window.innerWidth;
    this.forceUpdate();
  }

  render() {
    const { children: render } = this.props;
    return render({
      deviceType: this._windowWidth >= 1024 ? DeviceType.DESKTOP : DeviceType.MOBILE,
    });
  }
}

// TODO: 後でやる
// export const GetDeviceTypeFC: React.FC<Props> = ({children: render}) => {
//   const [deviceType, setDeviceType] = useState(DeviceType.DESKTOP);

//   const mediaQueryList = window.matchMedia("(orientation: portrait)");

//   return render({
//     deviceType: this._windowWidth >= 1024 ? DeviceType.DESKTOP : DeviceType.MOBILE,
//   });
// }
