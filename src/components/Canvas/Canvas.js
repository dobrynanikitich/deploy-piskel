import React, { Component } from 'react';

import { getEmptyImageCanvas } from '../../helpers';
import classes from './Canvas.module.scss';

const hexToRgba = require('hex-to-rgba');

class Canvas extends Component {
    constructor(props) {
        super(props)
        this.canvas = React.createRef();
        this.secondCanvas = React.createRef();
        this.canvasMatrix = null;
        this.xStartPos = null;
        this.yStartPos = null;
        this.xEndPos = null;
        this.yEndPos = null;
        this.coordX = null;
        this.coordY = null;
        this.startDrawing = this.startDrawing.bind(this);
        this.draw = this.draw.bind(this);
        this.startDrawingLine = this.startDrawingLine.bind(this);
        this.drawLine = this.drawLine.bind(this);
        this.stopDrawingLine = this.stopDrawingLine.bind(this);
        this.simpleBresenhams = this.simpleBresenhams.bind(this);
        this.isDrawing = false;
    }

    state = {
        isDrawing: false,
    }

    componentDidMount() {
        this.ctx = this.canvas.current.getContext('2d');
        this.secondCtx = this.secondCanvas.current.getContext('2d');
        const imageData = getEmptyImageCanvas();
        this.ctx.putImageData(imageData, 0, 0);
        this.props.convertImageToFrame();
        this.imgData = this.ctx.getImageData(0, 0, this.canvas.current.width, this.canvas.current.height);
        this.fillColor = null;
    }

    mouseDownHandler(e) {
        switch(this.props.activeTool) {
            case 'pen':
                this.startDrawing(e);
                break;
            case 'bucket':
                this.bucketTool(e)
                break;
            case 'bucketall':
                this.bucketToolSameColor(e)
                break;
            case 'eraser':
                this.startDrawing(e);
                break;
            case 'stroke':
                this.secondCanvas.current.style.display = 'block';
                this.startDrawingLine(e);
                break;
            default: break;
        }
    }

    mouseUpHandler(e) {
        switch(this.props.activeTool) {
            case 'pen':
                this.stopDrawing();
                break;
            case 'eraser':
                this.stopDrawing();
                break;
            case 'stroke':
                this.stopDrawingLine(e);
                break;
            case 'bucket':
              this.defineAreaToBucket(e)
              break;
            default: break;
        }
      this.props.convertImageToFrame();
    }

    mouseOutHandler(e) {
        switch(this.props.activeTool) {
            case 'pen':
                this.stopDrawing();
                break;
            case 'eraser':
                this.stopDrawing();
                break;
            default: break;
        }
    }

    startDrawingLine(e) {
        this.startX = null;
        this.startY = null;
        this.endX = null;
        this.endY = null;
        this.isDrawing = true;

        this.canvasMatrix = this.canvas.current.width / this.props.pixelsNumber;
        this.secondCtx.drawImage(this.canvas.current, 0, 0);
        this.secondCanvas.current.style.opacity = '1';
  
        this.secondCtx.fillStyle = this.props.currentColor;
        this.ctx.fillStyle = this.props.currentColor;
  
        this.startX = Math.floor(e.nativeEvent.offsetX / this.canvasMatrix);
        this.startY = Math.floor(e.nativeEvent.offsetY / this.canvasMatrix);
  
        this.secondCtx.moveTo(this.startX, this.startY);

        this.secondCanvas.current.addEventListener('mousemove', this.drawLine);
        this.secondCanvas.current.addEventListener('mouseUp', this.stopDrawingLine);
      }

      drawLine(e) {
        this.canvasMatrix = this.canvas.current.width / this.props.pixelsNumber;
  
        this.secondCtx.clearRect(0, 0, 640, 640);
        this.secondCtx.drawImage(this.canvas.current, 0, 0);
  
        this.endX = Math.floor(e.offsetX / this.canvasMatrix);
        this.endY = Math.floor(e.offsetY / this.canvasMatrix);
  
        this.simpleBresenhams(this.startX, this.startY, this.endX, this.endY, this.canvasMatrix, this.secondCtx);
      }

      stopDrawingLine(e) {
        this.secondCanvas.current.removeEventListener('mousemove', this.drawLine);
        this.secondCanvas.current.style.opacity = '0';

        this.endX = Math.floor(e.nativeEvent.offsetX / this.canvasMatrix);
        this.endY = Math.floor(e.nativeEvent.offsetY / this.canvasMatrix);
  
        this.simpleBresenhams(this.startX, this.startY, this.endX, this.endY, this.canvasMatrix, this.ctx);
        this.isDrawing = false;
        this.secondCanvas.current.style.display = 'none';
      }

      simpleBresenhams(startX, startY, endX, endY, devider, ctx) {
        const dx = Math.abs(endX - startX);
        const dy = Math.abs(endY - startY);

        const sx = startX < endX ? 1 : -1;
        const sy = startY < endY ? 1 : -1;
        let err = dx - dy;
        let coordX = null;
        let coordY = null;
        
    
        while (true) {
          coordX = startX;
          coordY = startY;
          coordX *= devider;
          coordY *= devider;
    
          ctx.fillRect(coordX, coordY, devider * this.props.pencilSize, devider * this.props.pencilSize);
    
          if (startX === endX && startY === endY) {
            break;
          }
          const err2 = 2 * err;
          if (err2 >= -dy) {
            err -= dy;
            startX += sx;
          }
          if (err2 <= dx) {
            err += dx;
            startY += sy;
          }
        }
      }

    startDrawing(e) {
        const { currentColor, pixelsNumber } = this.props;
        this.canvasMatrix = this.canvas.current.width / pixelsNumber;
        this.ctx.imageSmoothingEnabled = false;
        
        this.ctx.fillStyle = this.props.activeTool === 'eraser' ? 'gray' : currentColor;
        this.xStartPos = Math.floor(e.nativeEvent.offsetX / this.canvasMatrix);
        this.yStartPos = Math.floor(e.nativeEvent.offsetY / this.canvasMatrix);
        
        this.ctx.moveTo(this.xStartPos, this.yStartPos);

        this.canvas.current.addEventListener('mousemove', this.draw);
        this.canvas.current.addEventListener('click', this.draw);
    }

    draw(e) {
        this.xEndPos = Math.floor(e.offsetX / this.canvasMatrix);
        this.yEndPos = Math.floor(e.offsetY / this.canvasMatrix);

        const deltaX = Math.abs(this.xEndPos - this.xStartPos);
        const deltaY = Math.abs(this.yEndPos - this.yStartPos);
        const sx = this.xStartPos < this.xEndPos ? 1 : -1;
        const sy = this.yStartPos < this.yEndPos ? 1 : -1;
        let err = deltaX - deltaY;
      
        // eslint-disable-next-line no-constant-condition
        while (true) {
          this.coordX = this.xStartPos;
          this.coordY = this.yStartPos;
      
          this.coordX *= this.canvasMatrix;
          this.coordY *= this.canvasMatrix;
      
          this.ctx.fillRect(this.coordX, this.coordY, this.canvasMatrix * this.props.pencilSize, this.canvasMatrix * this.props.pencilSize);
      
          if (this.xStartPos === this.xEndPos && this.yStartPos === this.yEndPos) break;
          const err2 = 2 * err;
          if (err2 > -deltaY) {
            err -= deltaY;
            this.xStartPos += sx;
          }
          if (err2 < deltaX) {
            err += deltaX;
            this.yStartPos += sy;
          }
        }
      }

      stopDrawing() {
        this.canvas.current.removeEventListener('mousemove', this.draw);
      }

    transformHexToRgba(hex) {
      const regExp = /(.*?)(rgb|rgba)\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)/;
      const stringColor = hexToRgba(hex);
      const result = stringColor.match(regExp);
      const rgba = {
        r: result[3],
        g: result[4],
        b: result[5],
        a: result[6]
      };
      return rgba;
    }

    getPixelColor(imgData, x, y) {
      const index = (y * imgData.width + x) * 4;
      const rgba = {};
  
      rgba.r = imgData.data[index];
      rgba.g = imgData.data[index + 1];
      rgba.b = imgData.data[index + 2];
      rgba.a = imgData.data[index + 3];
      return rgba;
    }

    bucketTool(e) {    
        this.ctx.fillStyle = this.props.currentColor;
        this.fillColor = this.transformHexToRgba(this.props.currentColor);
    }

    defineAreaToBucket(e) {
      this.imgData = this.ctx.getImageData(0, 0, this.canvas.current.width, this.canvas.current.height);

      let cX0 = e.nativeEvent.offsetX;
      let cY0 = e.nativeEvent.offsetY;

      cX0 = Math.floor(cX0);
      cY0 = Math.floor(cY0);

      const rgba0 = this.getPixelColor(this.imgData, cX0, cY0);

      const pixelStack = [[cX0, cY0]];
      const colorLayerData = this.ctx.getImageData(0, 0, this.canvas.current.width, this.canvas.current.height);
      const startR = rgba0.r;
      const startG = rgba0.g;
      const startB = rgba0.b;

      if (startR == this.fillColor.r && startG == this.fillColor.g && startB == this.fillColor.b) return;

      while (pixelStack.length) {
        let newPos = [];
        let pixelPos = null;
        let reachLeft = null;
        let reachRight = null;
        let x = null;
        let y = null;

        newPos = pixelStack.pop();
        [x, y] = [newPos[0], newPos[1]];

        pixelPos = (y * this.canvas.current.width + x) * 4;

        while (y >= 0 && matchStartColor(pixelPos)) {
          y -= 1;
          pixelPos -= this.canvas.current.width * 4;
        }

        pixelPos += this.canvas.current.width * 4;
        reachLeft = false;
        reachRight = false;

        while (y < this.canvas.current.height - 1 && matchStartColor(pixelPos)) {
          y += 1;
          this.colorPixel(pixelPos, colorLayerData);
          if (x > 0) {
            if (matchStartColor(pixelPos - 4)) {
              if (!reachLeft) {
                pixelStack.push([x - 1, y]);
                reachLeft = true;
              }
            } else if (reachLeft) {
              reachLeft = false;
            }
          }
          if (x < this.canvas.current.width - 1) {
            if (matchStartColor(pixelPos + 4)) {
              if (!reachRight) {
                pixelStack.push([x + 1, y]);
                reachRight = true;
              }
            } else if (reachRight) {
              reachRight = false;
            }
          }
          pixelPos += this.canvas.current.width * 4;
        }
      }
      this.ctx.putImageData(colorLayerData, 0, 0);

      function matchStartColor(pixelPos) {
        const r = colorLayerData.data[pixelPos];
        const g = colorLayerData.data[pixelPos + 1];
        const b = colorLayerData.data[pixelPos + 2];

        return r == startR && g == startG && b == startB;
      }
    }

    colorPixel(pixelPos, colorLayerData) {
      colorLayerData.data[pixelPos] = this.fillColor.r;
      colorLayerData.data[pixelPos + 1] = this.fillColor.g;
      colorLayerData.data[pixelPos + 2] = this.fillColor.b;
      colorLayerData.data[pixelPos + 3] = 255;
    }

    findPos(obj) {
      let curleft = 0;
      let curtop = 0;
      if (obj.offsetParent) {
        do {
          curleft += obj.offsetLeft;
          curtop += obj.offsetTop;
        // eslint-disable-next-line no-param-reassign
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
      }
      return undefined;
    }
    
    rgbToHex(r, g, b) {
      return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    }

    bucketToolSameColor(e) {
      const canvas = document.getElementById('canvas');
      const position = this.findPos(canvas);
      const x = e.pageX - position.x;
      const y = e.pageY - position.y;
      // const coord = 'x=' + x + ', y=' + y;
      const c = canvas.getContext('2d');
      const p = c.getImageData(x, y, 1, 1).data;
      const hex = this.rgbToHex(p[0], p[1], p[2]);
      this.ctx.fillStyle = hex;
      this.ctx.fillRect(0, 0, this.canvas.current.width, this.canvas.current.height);
    }

    render() {
        return (
            <section className={classes.CanvasBlock}>
                <canvas
                    width={'640'}
                    height={'640'}
                    ref={this.canvas}
                    id={'canvas'}
                    className={classes.Canvas}
                    onMouseDown={(e) => this.mouseDownHandler(e)}
                    onMouseUp={(e) => this.mouseUpHandler(e)}
                    onMouseOut={(e) => this.mouseOutHandler(e)}
                ></canvas>
                <canvas
                    width={'640'}
                    height={'640'}
                    ref={this.secondCanvas}
                    id={'canvas2'}
                    className={classes.SecondCanvas}
                    onMouseDown={(e) => this.mouseDownHandler(e)}
                    onMouseUp={(e) => this.mouseUpHandler(e)}
                    onMouseOut={(e) => this.mouseOutHandler(e)}
                ></canvas>
            </section>
        );
    };
};

export default Canvas;