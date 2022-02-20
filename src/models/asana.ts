interface AsanaOpts {
  name: string;
  setup?: number;
  duration?: number;
  cooldown?: number;
  parts?: Array<AsanaOpts>
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
  setup: number;
  duration: number;
  cooldown: number;
  parts?: Array<AsanaOpts> = [];


  get totalTime(): number {
    return this.setup + this.duration + this.cooldown as number
  }
}
