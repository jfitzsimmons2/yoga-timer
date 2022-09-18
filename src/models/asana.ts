interface AsanaOpts {
  name: string;
  setup?: number;
  duration?: number;
  cooldown?: number;
  parts?: Array<AsanaOpts>;
  totalTime?: number;
}

export class Asana {
  constructor(obj?: AsanaOpts) {
    this.name = obj?.name ?? "";
    this.setup = obj?.setup ?? 1;
    this.duration = obj?.duration ?? 5;
    this.cooldown = obj?.cooldown ?? 1;
    this.parts = obj?.parts ?? [];
  }

  name: string;
  setup?: number;
  duration?: number;
  cooldown?: number;
  parts?: Array<Asana> = [];


  get totalTime(): number | undefined {
    return (this.setup ?? 0) + (this.duration ?? 0) + (this.cooldown ?? 0) as number
  }
}
