import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/*class PluginPreview extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="plugin-preview">
        <h2>{this.props.item.name}</h2>
        <p>{this.props.item.version}</p>
      </div>
    )
  }
}*/

class Plugin extends React.Component {
  constructor(props) {
    super(props);
  }

  showPreview = () => {
    console.log( this.props.item );
    // <PluginPreview item={this.props.item} />
  }

  render() {
    return (
      <div className="plugin col-md-3" onClick={this.showPreview}>
         <div className="inner">
          <div className="overlay" />
          <div className="content">
            <h2 className="h5">{this.props.item.name}</h2>
            <p>Version {this.props.item.version}</p>
          </div>
        </div>
        {/*<p>{this.props.item.slug}</p>
        <p>{this.props.item.preview_url}</p>
        <p>{this.props.item.author}</p>
        <p>{this.props.item.screenshot_url}</p>
        <p>{this.props.item.rating}</p>
        <p>{this.props.item.num_ratings}</p>
        <p>{this.props.item.homepage}</p>*/}
        {/*<p>{this.props.item.description}</p>*/}
      </div>
    );
  }
}

class Plugins extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let result = this.props.plugins;
    console.log( result );
    let plugins = result.plugins || {};
    return (
      <div className="plugins row">
      { Object.keys( plugins ).map( (key) => <Plugin item={plugins[key]} key={key} /> ) }
      </div>
    );
  }
}
class PluginsContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      search_term : '',
      plugins : [],
    }
  }
  // onChange = ( search ) => {
  //   this.setState( { search } );
  // };
  
  initialLoadSites = () => {
    fetch( 'https://api.wordpress.org/plugins/info/1.1/?action=query_plugins&request[browse]=popular' ).then(response => {
        return response.json();
      }).then(data => {

        console.log( data );
        this.setState( {
          plugins : data,
          search_term: '',
        } );
      });
  }

  componentDidMount = () => {
    this.initialLoadSites()
  }
  // componentWillUpdate = () => {
  //   console.log( 'mount' + this.state.search_term );
  // }

  searchPlugin = ( event ) => {
    let search_term = event.target.value;
    if( event.target.value ) {
      fetch( 'https://api.wordpress.org/plugins/info/1.1/?action=query_plugins&request[search]=' + event.target.value ).then(response => {
        return response.json();
      }).then(data => {

        console.log( data );
        this.setState( {
          plugins : data,
          search_term: search_term,
        } );
      });
    } else {
      this.initialLoadSites()
    }
    // console.log( event.target.value );
  }

  searchTermBox = () => {
    const isShow = this.state.search_term ? true : false;
    if( isShow ) {
      return <p>Search for <code>{this.state.search_term}</code></p>;
    }

    return '';
  }

  render() {
    return (
      <div className="container">
        <div className="header">
          <h2>WordPress Plugins</h2>

          <input type="search" className="search-input form-control" placeholder="Search.." onChange={this.searchPlugin} />
          { this.searchTermBox() }
        </div>
        <Plugins plugins={this.state.plugins} />
      </div>
    );
  }
}

ReactDOM.render(
  <PluginsContainer />,
  document.getElementById('root')
);
