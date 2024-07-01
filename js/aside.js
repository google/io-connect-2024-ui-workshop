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

// sidenav form element we want to watch for selection changes
const aside = document.querySelector('main > aside fieldset')

// all of the product cards we want to filter based on the aside selection
const filterTargets = document.querySelectorAll(`section .product-card`)

// get the users motion preference
const { matches:motionOK } = window.matchMedia('(prefers-reduced-motion: no-preference)')

// this gives each product a unique view transition name
// only if the user is ok with motion, because this will enable position morphing
// by default they crossfade which is great for "no motion"
if (motionOK) {
	filterTargets.forEach((item, i) => {
		item.parentNode.style.viewTransitionName = '--product-'+i
	})
}

// when the user changes the aside radio group selected value
aside.addEventListener('input', event => {
	// extract their choice
	const category = event.target.value

	// the filter mutation: just display: none if no match
	function filter() {
		filterTargets.forEach(item => {
			item.parentNode.style.display = item.dataset?.categories?.includes(category) || category === 'everything'
				? null
				: 'none'
		})
	}

	// conditional view transition
	document.startViewTransition
    ? document.startViewTransition(() => filter())
    : filter()
})