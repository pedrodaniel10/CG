'use strict';

var CANDLE_X = 450 - 110;
var CANDLE_Z = 200 - 110;

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
            this.sunLight.visible = !this.sunLight.visible;
        }
    }

    setCandleLights() {
        if (lightsOn) {
            for (let i = 0; i < this.lights.length; i++) {
                if (this.lights[i] instanceof CandleLight) {
                    this.lights[i].visible = !this.lights[i].visible;
                }
            }
        }
    }

    setLightCalculations() {
        if (lightsOn) {
            for (let i = 0; i < this.lights.length; i++) {
                this.lights[i].visible = false;
            }
        }
        else {
          for (let i = 0; i < this.lights.length; i++) {
              this.lights[i].visible = true;
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
