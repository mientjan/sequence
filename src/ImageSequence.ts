
import ISequenceData from "./ISequenceData";
import IFrame from "./IFrame";
export interface IMetadata {
	src: string;
	total: number;
	spriteWidth: number;
	spriteHeight: number;
	fps?: number;
}

export class ImageSequence {

	private _src: string;
	private _metadata: string;
	private _domCanvas;
	private _domImage;
	private _promiseImage;
	private _frame = 0;
	private _drawFrame = -1;
	private _fpms;
	private _time = 0;
	private _raf = -1;
	private _frames:Array<IFrame>;


	constructor (width, height, metadata: ISequenceData)
	{
		this._src = metadata.src;
		this._frames = metadata.frames;

		this._domCanvas = document.createElement('canvas');
		this._domCanvas.width = width;
		this._domCanvas.height = height;
	}

	public load (): Promise<ImageSequence>
	{
		if (!this._promiseImage)
		{
			this._promiseImage = new Promise((resolve, reject) =>
			{
				let img = document.createElement('img');
				img.addEventListener('load', () =>
				{
					this._domImage = img;
					resolve(this);
				});
				img.addEventListener('error', () =>
				{
					reject(img);
				});
				img.src = this._src;
			});
		}
		return this._promiseImage;
	}

	public getDomElement (): HTMLCanvasElement
	{
		return this._domCanvas;
	}

	public getFrame (): number
	{
		return this._frame;
	}

	public start ()
	{
		this._raf = requestAnimationFrame(this.tick);
	}

	public stop ()
	{
		cancelAnimationFrame(this._raf);
		this._time = 0;
		this._frame = -1;
		this._drawFrame = -1;
	}

	private tick = (time) =>
	{
		this._raf = requestAnimationFrame(this.tick);

		if (!this._time)
		{
			this._time = time;
		}

		let frame = ((time - this._time) / this._fpms | 0) % this._frames.length;
		this._frame = frame;

		if (frame != this._drawFrame)
		{
			this._drawFrame = frame;
			let obj = this._frames[frame];

			if(obj)
			{

			}
			let ctx = this._domCanvas.getContext('2d');

			ctx.drawImage(this._domImage, obj.x, obj.y, obj.w, obj.h, obj.dx, obj.dy, obj.dw, obj.dh);
		}
	}
}