// Copyright 2024 Google LLC

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     https://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// find all pictures that want to be able to go into the lightbox
const pictures = document.querySelectorAll('[light-box]')

// local state about whether the popover is currently open or not
const state = {
	open: false
}

// listen for clicks on each lightbox picture
pictures.forEach(picture => {
	picture.addEventListener('click', event => {
		// if the lightbox is closed
		if (!state.open) {
			// send the picture to the handling function for showing the popover
			lightboxImage(picture)
		}
	})
})

function lightboxImage(picture) {
	// <figure id="lightbox" popover></figure> automatically exposed lightbox as a variable
	// here we take the html from the clicked image and put it into the lightbox element
	lightbox.innerHTML = picture.querySelector(':scope img').outerHTML

	// now we call the API to put the popover lightbox into the :top-layer
	lightbox.showPopover()
}

// listen for our popover to be shown/hidden/dismissed
// store the state for use in our click handler
// goal: prevent light dismiss from not working if users 
//       click on another image behind the backdrop
lightbox.addEventListener('toggle', event => {
	state.open = event.newState === 'open'
})