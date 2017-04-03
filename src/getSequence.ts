
import ISequenceData from "./ISequenceData";
import ISequence from "./ISequence";

export default function getSequence(src, {total, width, height, imageWidth, imageHeight, spriteWidth, spriteHeight}:ISequence):ISequenceData
{
	let sequence:ISequenceData = {
		src: src,
		frames: []
	};

	for (var frame = 0; frame < total; frame++)
	{
		let x = (frame % Math.floor(imageWidth / spriteWidth))
		let y = Math.floor(frame / Math.floor(imageWidth / spriteWidth))

		sequence.frames.push({
			x: spriteWidth * x,
			y: spriteHeight * y,
			w: spriteWidth,
			h: spriteHeight,
			dx: 0,
			dy: 0,
			dw: width,
			dh: height,
		})

	}

	return sequence;
}