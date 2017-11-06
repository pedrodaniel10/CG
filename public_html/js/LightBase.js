'use strict';

var CANDLE_X = 320;
var CANDLE_Z = 70;

class LightBase extends THREE.Object3D {
    constructor() {
        super();
        this.lights = [];

        this.sunLight = new SunLight();
        this.lights.push(this.sunLight);

        this.createCandles();

        for (let i = 0; i < this.lights.length; i++) {
            this.add(this.lights[i]);
        }
    }


    setSunLight() {
        if (lightsOn) {
            this.sunLight.light.visible = !this.sunLight.light.visible;
        }
    }

    setCandleLights() {
        if (lightsOn) {
            for (let i = 0; i < this.lights.length; i++) {
                if (this.lights[i] instanceof CandleLight) {
                    this.lights[i].light.visible = !this.lights[i].light.visible;
                }
            }
        }
    }

    setLightCalculations() {
        if (lightsOn) {
            for (let i = 0; i < this.lights.length; i++) {
                this.lights[i].light.visible = false;
            }
        }
        else {
          for (let i = 0; i < this.lights.length; i++) {
              this.lights[i].light.visible = true;
          }
        }
        lightsOn = !lightsOn;
    }

    createCandles() {
      this.lights.push(new CandleLight(-CANDLE_X, -CANDLE_Z));
      this.lights.push(new CandleLight(0, -CANDLE_Z));
      this.lights.push(new CandleLight(CANDLE_X, -CANDLE_Z));
      this.lights.push(new CandleLight(-CANDLE_X, CANDLE_Z));
      this.lights.push(new CandleLight(0, CANDLE_Z));
      this.lights.push(new CandleLight(CANDLE_X, CANDLE_Z));


    }

}
