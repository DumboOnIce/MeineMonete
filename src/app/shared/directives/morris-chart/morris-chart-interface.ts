export interface ChartData {
    label: string;
    value: number;
  }
  
  export interface ChartDatas {
      [key: string]: ChartData;
  }
  
  export interface ChartOptions {
    element: Element;
    data: ChartDatas;
    resize?: boolean;
  }
  
  
  export interface ChartDonutOptions extends ChartOptions {
    colors?: Array<string>;
    formater?: (y: any, data: any) => string;
    resize?: boolean;
  }
  
  export interface ChartAreaBarLineOptions {
    xkey: string,
    ykeys: Array<string>;
    labels: Array<string>;
    hideHover?: boolean|string;
    hoverCallback?: (index: any, options: any, content: any, row: any) => void;
    axes?: boolean;
    grid?: boolean;
    gridTextColor?: string;
    gridTextSize?: number;
    gridTextFamily?: string;
    gridTextWeight?: string;
    fillOpacity?: number;
  }
  
  export interface ChartAreaOptions extends ChartAreaBarLineOptions {
    behaveLikeLine?: boolean;
  }
  
  export interface ChartBarOptions extends ChartAreaBarLineOptions {
    barColors?: Array<string>;
    stacked?: boolean;
  }
  
  export interface ChartLineOptions extends ChartAreaBarLineOptions {
    lineColors?: Array<string>;
    lineWidth?: number;
    pointSize?: number;
    pointFillColors?: string;
    pointStrokeColors?: string;
    ymax?: string|number;
    ymin?: string|number;
    smooth?: boolean;
    postUnits?: string;
    preUnits?: string;
    dateFormat?: (timestamp: number) => string;
    xLabels?: string;
    xLabelFormat?: (date: Date) => string;
    xLabelAngle?: number;
    yLabelFormat?: (label: string|number) => string;
    goals?: Array<number>;
    goalStrokeWidth?: number;
    goalLineColors?: string;
    events?: Array<number>;
    eventStrokeWidth?: number;
    eventLineColors?: Array<string>;
    continuousLine?: boolean;
  }