/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

// MODULES //

import React from 'react';
import config from './config.js';


// MAIN //

/**
* Renders the application footer.
*
* @private
* @param {Object} props - component properties
* @returns {JSX} rendered component
*/
function Footer() {
	return (
		<footer>
			<nav className="bottom-nav center" aria-label="Footer">
				<a href={ config.funding } title="Help support the project">Donate</a>
				{ ' / ' }
				<a href={ config.mount } title="Documentation">Docs</a>
				{ ' / ' }
				<a href={ config.gitter } title="Talk to us on Gitter!">Chat</a>
				{ ' / ' }
				<a href={ config.twitter } title="Follow us on Twitter!">Twitter</a>
				{ ' / ' }
				<a href={ config.repository } title="Contribute to stdlib">Contribute</a>
			</nav>
		</footer>
	);
};


// EXPORTS //

export default Footer;
