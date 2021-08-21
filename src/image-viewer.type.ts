import * as React from 'react';
import { Image, ImageURISource, Text, View, ViewStyle, EasingFunction, Easing } from 'react-native';
import { simpleStyle } from './image-viewer.style';

interface IOnMove {
  type: string;
  positionX: number;
  positionY: number;
  scale: number;
  zoomCurrentDistance: number;
}

export class Props {

  /**
   * unused?
   */
  public show?: boolean = false;

  /**
   * array of IImageInfo to be displayed
   */
  public imageUrls: IImageInfo[] = [];

  /**
   * x threshold for sliding to next page
   */
  public flipThreshold?: number = 80;

  /**
   * max position before sliding to next page
   */
  public maxOverflow?: number = 300;

  /**
   * image index to show initially
   */
  public index?: number = 0;

  /**
   * 加载失败的图
   */
  public failImageSource?: IImageInfo = undefined;

  /**
   * background color of viewer
   */
  public backgroundColor?: string = 'black';

  /**
   * style props for the footer container
   */
  public footerContainerStyle?: object = {};

  /**
   * Menu Context Values
   */
  public menuContext?: any = { saveToLocal: 'save to the album', cancel: 'cancel' };

  /**
   * allow save to local by long press
   */
  public saveToLocalByLongPress?: boolean = true;

  /**
   * allow image zoom
   */
  public enableImageZoom?: boolean = true;

  public style?: ViewStyle = {};

  /**
   * Enable swipe down to close image viewer.
   * When swipe down, will trigger onCancel.
   */
  public enableSwipeDown?: boolean = false;

  /**
   * threshold for firing swipe down function
   */
  public swipeDownThreshold?: number;

  public doubleClickInterval?: number;

  /**
   * Min and Max scale for zooming
   */
  public minScale?: number;

  public maxScale?: number;

  /**
   * allow image preloading
   */
  public enablePreload?: boolean = false;

  /**
   * animation time to turn pages
   */
  public pageAnimateTime?: number = 100;

  /**
   * Whether to use the native code to perform animations.
   */
  public useNativeDriver?: boolean = false;

  /**
   * callback for long press on image
   */
  public onLongPress?: (image?: IImageInfo) => void = () => {
    //
  };

  /**
   * callback for click on image
   */
  public onClick?: (close?: () => any, currentShowIndex?: number) => void = () => {
    //
  };

  /**
   * callback for double click
   */
  public onDoubleClick?: (close?: () => any) => void = () => {
    //
  };

  /**
   * override method for saving picture locally 
   */
  public onSave?: (url: string) => void = () => {
    //
  };

  public onMove?: (position?: IOnMove) => void = () => {
    //
  };

  /**
   * custom header component render
   */
  public renderHeader?: (currentIndex?: number) => React.ReactElement<any> = () => {
    return null as any;
  };

  /**
   * custom footer component render
   */
  public renderFooter?: (currentIndex: number) => React.ReactElement<any> = () => {
    return null as any;
  };

  /**
   * custom component for pagination
   */
  public renderIndicator?: (currentIndex?: number, allSize?: number) => React.ReactElement<any> = (
    currentIndex?: number,
    allSize?: number
  ) => {
    if (allSize != null && currentIndex === allSize + 1) {
      return null as any;
    }

    return React.createElement(
      View,
      { style: simpleStyle.count },
      React.createElement(Text, { style: simpleStyle.countText }, currentIndex + '/' + allSize)
    );
  };

  /**
   * Render image component
   */
  public renderImage?: (props: any) => React.ReactElement<any> = (props: any) => {
    return React.createElement(Image, props);
  };

  /**
   * custom left arrow component
   */
  public renderArrowLeft?: () => React.ReactElement<any> = () => {
    return null as any;
  };

  /**
   * custom right arrow component
   */
  public renderArrowRight?: () => React.ReactElement<any> = () => {
    return null as any;
  };

  /**
   * callback for modal pop up
   */
  public onShowModal?: (content?: any) => void = () => {
    //
  };

  /**
   * callback for canceling image viewing
   */
  public onCancel?: () => void = () => {
    //
  };

  /**
   * function that fires when user swipes down
   */
  public onSwipeDown?: () => void = () => {
    //
  };

  /**
   * react element to render while image is loading
   */
  public loadingRender?: () => React.ReactElement<any> = () => {
    return null as any;
  };

  /**
   * callback for saving to album
   */
  public onSaveToCamera?: (index?: number) => void = () => {
    //
  };

  /**
   * callback when image is switched
   */
  public onChange?: (index?: number) => void = () => {
    //
  };

  public menus?: ({ cancel, saveToLocal }: any) => React.ReactElement<any>;

  public easingFunction?: EasingFunction = Easing.linear;

  /**
   * function that fires when user tries to swipe past last index
   */
  public onGoNextFail?: (index?: number) => void = () => {
    //
  };

  /**
   * function that fires when user tries to swipe before first index
   */
  public onGoBackFail?: () => void = () => {
    //
  };

  /**
   * animation time for initial page load
   */
  public pageInitialAnimateTime?: number = 1000;

  /**
   * react element to use as a transition card
   */
  public nextTransitionCard?: () => React.ReactElement<any> = () => {
    return null as any;
  };

  /**
   * react element to show when an image fails to load
   */
  public failImageRender?: () => React.ReactElement<any> = () => {
    return null as any;
  };
}

export class State {
  /**
   * unused?
   */
  public show?: boolean = false;

  /**
   * which index is currently shown
   */
  public currentShowIndex?: number = 0;

  /**
   * Used to detect if parent component applied new index prop
   */
  public prevIndexProp?: number = 0;

  /**
   * is image loaded
   */
  public imageLoaded?: boolean = false;

  /**
   * array holding image sizes
   */
  public imageSizes?: IImageSize[] = [];

  /**
   * allow menu to show
   */
  public isShowMenu?: boolean = false;
}

export interface IImageInfo {
  url: string;

  /**
   * width of image
   * if not provided, will try fetching the sizes via
   * image getSizeWithHeaders 
   */
  width?: number;

  /**
   * height of image
   * if not provided, will try fetching the sizes via
   * image getSizeWithHeaders 
   */
  height?: number;

  /**
   * image size in kb
   */
  sizeKb?: number;
  /**
   * original image size 
   * if originSizeKb & originUrl is set
   * the view original image button will be displayed
   */
  originSizeKb?: number;
  /**
   * original image url
   */
  originUrl?: string;
  /**
   * Pass to image props
   */
  props?: any;
  /**
   * TODO
   */
  freeHeight?: boolean;
  /**
   * TODO
   */
  freeWidth?: boolean;
  /**
   * is next transction card
   */
  isNextTransitionCard?: boolean;
}

export interface IImageSize {
  width: number;
  height: number;

  status: 'loading' | 'success' | 'loadSuccess' | 'fail';
}
