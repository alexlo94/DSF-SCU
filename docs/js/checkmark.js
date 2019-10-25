/*
checkmark.js
author: alexandros lotsos
summary: behavior component for the checkmark primitive. When an image target is first scanned, the component will update the UI accordingly.
After that the checkmark component will just keep the model centered onto a found image target.
*/

AFRAME.registerComponent('checkmark', {
    schema: {
        name: {
            type: 'string'
        },
    },
    init: function () {

        //get a reference to this object's geometry and scene element
        const {object3D, sceneEl} = this.el;

        //Make the elements for the UI update
        const infoBox = document.querySelector("#info-box");

        const detected = document.createElement('h2');
        detected.textContent = "Match Detected!";

        const matchPercent = document.createElement('h3');
        matchPercent.textContent = `${90 + Math.floor(Math.random() * 10)}% match.`;

        const codeword = document.createElement('h3');
        codeword.textContent = `Codeword is Greece`;

        const fitmsg = document.createElement('h3');
        fitmsg.textContent = "Fit your message to the frame above";

        //hide the image target until it is found
        object3D.visible = false;

        //set up the checkmark model
        const checkEl = document.createElement('a-entity');
        checkEl.setAttribute('scale', '1 1 1');
        checkEl.setAttribute('rotation', '0 0 0');
        checkEl.setAttribute('gltf-model', '#checkmark');
        this.el.appendChild(checkEl);

        //functions for first and last frame of image scan
        const firstFrame = ({detail}) => {
            //update UI
            while(infoBox.firstChild){
                infoBox.removeChild(infoBox.firstChild);
            }

            infoBox.appendChild(detected);
            infoBox.appendChild(matchPercent);
            infoBox.appendChild(codeword);


            //position the checkmark on image target
            showImage({detail});
        }

        const lastFrame = ({detail}) => {
            //update UI
            while(infoBox.firstChild){
                infoBox.removeChild(infoBox.firstChild);
            }

            infoBox.appendChild(fitmsg);

            //hide the checkmark
            hideImage({detail});
        }

        //showImage function to display the checkmark over the image target
        const showImage = ({detail}) => {
            console.log('Image Found');
            //update position/rotation/scale to match the image target
            object3D.position.copy(detail.position);
            object3D.quaternion.copy(detail.rotation);
            object3D.scale.set(detail.scale, detail.scale, detail.scale);
            object3D.visible = true;
        }

        //hideImage function to hide the checkmark when the image target is lost
        const hideImage = ({detail}) => {
            console.log('Image Lost');
            object3D.visible = false;
        }

        //add eventlisteners to the xrextras-generate-image-targets events
        this.el.addEventListener('xrimagefound', firstFrame);
        this.el.addEventListener('xrimageupdated', showImage);
        this.el.addEventListener('xrimagelost', lastFrame);
    }
});