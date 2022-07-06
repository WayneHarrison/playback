import * as React from "react";
import "rc-tooltip/assets/bootstrap.css";
import Slider from "rc-slider";
import type { SliderProps } from "rc-slider";
import raf from "rc-util/lib/raf";
import Tooltip from "rc-tooltip";
import { SecondsToHoursMinutesSeconts } from "../Helpers/utils";
import { SliderType } from "../models/Enums/SliderType";
import { HandleProps } from "rc-slider/lib/Handles/Handle";

const HandleTooltip = (props: {
  value: number;
  children: React.ReactElement;
  visible: boolean;
  type: SliderType;
  tipFormatter?: (value: number) => React.ReactNode;
}) => {
  const {
    value,
    children,
    visible,
    type,
    tipFormatter = (val) =>
      type === SliderType.Time ? SecondsToHoursMinutesSeconts(val) : `${val} %`,
    ...restProps
  } = props;

  const tooltipRef = React.useRef<any>();
  const rafRef = React.useRef<number | null>(null);

  function cancelKeepAlign() {
    raf.cancel(rafRef.current!);
  }

  function keepAlign() {
    rafRef.current = raf(() => {
      tooltipRef.current?.forcePopupAlign();
    });
  }

  React.useEffect(() => {
    if (visible) {
      keepAlign();
    } else {
      cancelKeepAlign();
    }

    return cancelKeepAlign;
  }, [value, visible]);

  return (
    <Tooltip
      placement="top"
      overlay={tipFormatter(value)}
      overlayInnerStyle={{ minHeight: "auto" }}
      ref={tooltipRef}
      visible={visible}
      {...restProps}
    >
      {children}
    </Tooltip>
  );
};

const TooltipSlider = ({
  tipFormatter,
  tipProps,
  type,
  ...props
}: SliderProps & {
  tipFormatter?: (value: number) => React.ReactNode;
  tipProps: any;
  type: SliderType;
}) => {
  const tipHandleRender: SliderProps["handleRender"] = (node, handleProps) => {
    return (
      <HandleTooltip
        value={handleProps.value}
        visible={handleProps.dragging}
        tipFormatter={tipFormatter}
        type={type}
        {...tipProps}
      >
        {node}
      </HandleTooltip>
    );
  };

  return <Slider {...props} handleRender={tipHandleRender} />;
};

export default TooltipSlider;
