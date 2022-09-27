export class Asana {
  constructor(obj?: {id?: number, name: string, setup?: number, duration: number, cooldown?: number, parts?: Array<any>, sets?: number}) {
    this.id = obj?.id ?? 0;
    this.name = obj?.name ?? "";
    this.setup = obj?.setup ?? 1;
    this.duration = obj?.duration ?? 5;
    this.cooldown = obj?.cooldown ?? 1;
    this.sets = obj?.sets ?? 1;
    this.parts = obj?.parts ?? [];
  }
  id: number;
  name: string;
  setup?: number;
  duration?: number;
  cooldown?: number;
  sets?: number;
  parts?: Array<Asana> = [];


  get totalTime(): number | undefined {
    return (this.setup ?? 0) + (this.duration ?? 0) + (this.cooldown ?? 0) as number
  }
}
