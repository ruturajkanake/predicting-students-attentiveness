Number.prototype.map = function (in_min, in_max, out_min, out_max) {
    return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

export const calculateAttention = (obj) => {
    let data = obj,
        totalXcoord = 0,
        totalYcoord = 0,
        details = null;
    
    if (data === null || data.length === 0){
        return null;
    }
    else {

        // calculate the pupil position and store that
        for (let i = 0; i < data.length; i++) {
            var faceLand = data[i].faceLandmarks;

            // Error handling
            if (faceLand === null || !('pupilLeft' in faceLand) || !('pupilRight' in faceLand)) {
            } else {
                details = {
                    x: Math.abs(faceLand.pupilLeft.x + faceLand.pupilRight.x) / 2,
                    y: Math.abs(faceLand.pupilLeft.y + faceLand.pupilRight.y) / 2
                };
                totalXcoord += Math.abs(details.x.map(50, 250, 10, 15));
                totalYcoord += Math.abs(details.y.map(50, 250, 10, 15));
            }
        }
    }
    
    if (details != null) {
        var atten = ((totalXcoord + totalYcoord) / data.length) - 10;
        return atten;
    } else {
        return null;
    }
}