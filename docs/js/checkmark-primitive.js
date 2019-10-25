/*
checkmark-primitive.js
Author: Alexandros Lotsos
Summary: Checkmark primitive to be overlaid on image targets. Has the checkmark model and the checkmark component by default
*/

AFRAME.registerPrimitive('checkmark-primitive', {
    defaultComponents: {
        checkmark: {},
    },

    mappings: {
        name: 'checkmark.name',
    }
});