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

import React, { Component, Fragment } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import IframeResizer from 'iframe-resizer-react';
import Tooltip from '@material-ui/core/Tooltip';
import GetAppIcon from '@material-ui/icons/GetApp';
import SideMenu from './side_menu.jsx';
import WelcomePage from './welcome_page.jsx';
import ReadmePage from './readme_page.jsx';
import Footer from './footer.jsx';
import TopNav from './top_nav.jsx';
import iframeBootstrap from './bootstrap_iframe.js';
import pkgPath from './pkg_doc_path.js';
import log from './log.js';
import downloadAssets from './download_assets.js';
import HTML_FRAGMENT_CACHE from './html_fragment_cache.js';
import JSON_CACHE from './json_cache.js';
import config from './config.js';


// MAIN //

class App extends Component {
	constructor( props ) {
		var pathname;
		var version;
		var prefix;
		var i;
		var j;

		super( props );

		prefix = config.mount;
		pathname = props.history.location.pathname;
		i = pathname.indexOf( prefix ) + prefix.length;
		j = pathname.substring( i ).indexOf( '/' );
		if ( j === -1 ) {
			version = '';
		} else {
			version = pathname.substring( i, i+j );
		}
		if ( !config.versions.includes( version ) ) {
			pathname = pathname.replace( prefix+version, prefix+config.versions[0]+'/' );
			this.props.history.push( pathname );
			version = config.versions[ 0 ];
		}
		this.state = {
			'slideoutIsOpen': true,
			'version': version,
			'packageTree': null,
			'packageResources': {}
		};
	}

	componentDidMount() {
		this._fetchJSONFiles();
	}

	_handleSlideOutChange = ( value ) => {
		this.setState({
			'slideoutIsOpen': value
		});
	}

	_fetchJSONFiles = () => {
		var tpath;
		var rpath;

		tpath = config.mount+this.state.version+'/package_tree.json';
		if ( JSON_CACHE[ tpath ] ) {
			this.setState({
				'packageTree': JSON_CACHE[ tpath ]
			});
		} else {
			fetch( tpath )
				.then( res => res.json() )
				.then( res => {
					JSON_CACHE[ tpath ] = res;
					this.setState({
						'packageTree': res
					});
				})
				.catch( log );
		}
		rpath = config.mount+this.state.version+'/package_resources.json';
		if ( JSON_CACHE[ rpath ] ) {
			this.setState({
				'packageResources': JSON_CACHE[ rpath ]
			});
		} else {
			fetch( rpath )
				.then( res => res.json() )
				.then( res => {
					JSON_CACHE[ rpath ] = res;
					this.setState({
						'packageResources': res
					});
				})
				.catch( log );
		}
	}

	_fetchFragment = ( path ) => {
		window.scrollTo( 0, 0 );
		this.props.history.push( path );
		if ( HTML_FRAGMENT_CACHE[ path ] ) {
			this._replaceReadmeContainer( HTML_FRAGMENT_CACHE[ path ] );
		} else {
			fetch( path+'?fragment=true' )
				.then( res => res.text() )
				.then( res => {
					HTML_FRAGMENT_CACHE[ path ] = res;
					this._replaceReadmeContainer( res );
				})
				.catch( log )
		}
	}

	_downloadAssets = () => {
		downloadAssets( Object.keys( this.state.packageResources ), this.state.version );
	}

	_selectVersion = ( event ) => {
		var pathname = this.props.history.location.pathname;
		var version = event.target.value;

		pathname = pathname.replace( this.state.version, version );
		this.props.history.push( pathname );

		this.setState({
			'version': version
		}, this._fetchJSONFiles );
	}

	_replaceReadmeContainer( res ) {
		var el = document.getElementById( 'readme' );
		if ( el ) {
			el.innerHTML = res;
		}
	}

	_renderReadme = ({ match }) => {
		var resources = this.state.packageResources[ match.params.pkg ];
		return (
			<Fragment>
				<TopNav
					pkg={ match.params.pkg }
					version={ match.params.version }
					docs={ false }
					benchmarks={ Boolean( resources && resources.benchmark ) }
					tests={ Boolean( resources && resources.test ) }
					src={ Boolean( resources ) }
					typescript={ Boolean( resources && resources.typescript ) }
				/>
				<ReadmePage path={ match.url } />
			</Fragment>
		);
	}

	_renderBenchmark = ({ match }) => {
		var resources;
		var iframe;

		resources = this.state.packageResources[ match.params.pkg ];
		if ( resources.benchmark ) {
			iframe = <IframeResizer
				className="benchmarks-iframe"
				srcdoc={ iframeBoostrap( match.url ) }
				title="Benchmarks"
				width="100%"
				checkOrigin={false}
			/>;
		} else {
			// TODO: more creative 404
			iframe = <p><code>{ match.params.pkg }</code> does not have any benchmarks.</p>;
		}
		return (
			<Fragment>
				<TopNav
					pkg={ match.params.pkg }
					version={ match.params.version }
					docs={ true }
					benchmarks={ false }
					tests={ Boolean( resources && resources.test ) }
					src={ Boolean( resources ) }
					typescript={ Boolean( resources && resources.typescript ) }
				/>
				{ iframe }
			</Fragment>
		);
	}

	_renderTest = ({ match }) => {
		var resources;
		var iframe;

		resources = this.state.packageResources[ match.params.pkg ];
		if ( resources.test ) {
			iframe = <IframeResizer
				className="tests-iframe"
				srcdoc={ iframeBoostrap( match.url ) }
				title="Tests"
				width="100%"
				checkOrigin={false}
			/>;
		} else {
			// TODO: more creative 404
			iframe = <p><code>{ match.params.pkg }</code> does not have any tests.</p>;
		}
		return (
			<Fragment>
				<TopNav
					pkg={ match.params.pkg }
					version={ match.params.version }
					docs={ true }
					benchmarks={ Boolean( resources && resources.benchmark ) }
					tests={ false }
					src={ Boolean( resources ) }
					typescript={ Boolean( resources && resources.typescript ) }
				/>
				{ iframe }
			</Fragment>
		);
	}

	_renderWelcome = () => {
		return (
			<WelcomePage version={this.state.version} />
		);
	}

	render() {
		return (
			<div class="main" role="main">
				<SideMenu
					onDrawerChange={ this._handleSlideOutChange }
					onReadmeChange={ this._fetchFragment }
					onVersionChange={ this._selectVersion }
					open={ this.state.slideoutIsOpen }
					version={ this.state.version }
					packageTree={ this.state.packageTree }
				/>
				<div className="readme-container" style={{
					marginLeft: this.state.slideoutIsOpen ? 350 : 0
				}}>
					<Switch>
						<Route
							exact
							path={ config.mount+':version/@stdlib/:pkg*/benchmark.html' }
							render={ this._renderBenchmark }
						/>
						<Route
							exact
							path={ config.mount+':version/@stdlib/:pkg*/test.html' }
							render={ this._renderTest }
						/>
						<Route
							exact
							path={ config.mount+':version//@stdlib/:pkg*/index.html' }
							render={ this._renderReadme }
						/>
						<Route
							exact
							path={ config.mount+':version/@stdlib/:pkg*' }
							render={ this._renderReadme }
						/>
						<Route
							exact
							path={ config.mount+':version' }
							render={ this._renderWelcome }
						/>
					</Switch>
				</div>
				<Footer />
				<Tooltip placement="left" title="Download documentation for offline access">
					<GetAppIcon
						style={ { position: 'fixed', bottom: 20, right: 20, cursor: 'pointer' } }
						onClick={ this._downloadAssets }
					/>
				</Tooltip>
			</div>
		);
	}
}


// EXPORTS //

export default withRouter( App );
