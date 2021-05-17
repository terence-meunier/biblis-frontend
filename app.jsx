// Element de construction de Record
function Element(props) {
    return (
        <ul>
            <li>Auteur : {props.author}</li>
            <li>Editeur : {props.editor}</li>
            <li>Date de parution : {props.createdDate}</li>
        </ul>
    )
}

// Element lorsque plusieurs elements sont retournés
class Records extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            records: null
        };
    }

    componentDidMount() {
        window.fetch("http://localhost:4567")
        .then((res) => res.json())
        .then((datas) => {
            console.log(datas);
            this.setState({
                records: datas
            });
        })
        .catch((err) => console.error(err));
    }

    render() {

        if (this.state.records == null) {
            return (
            <h2>
                Chargement...
            </h2>
            );
        } else {
            return (
                <div>
                    {this.state.records.map((record) => {
                        return (
                        <div key={record.recordID}>
                            <a href={"?record=" + record.recordID}><h2>{record.recordTitle}</h2></a>
                            <Element  
                            author={record.author}
                            editor={record.editor}
                            createdDate={record.createdDate}
                            />
                        </div>
                        )
                    })}
                </div>
            );
        }
    }
}

// Element lorsqu'un seul element est retourné
class Record extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            record: null
        };
    }

    componentDidMount() {
        window.fetch("http://localhost:4567/" + this.props.id)
        .then((res) => res.json())
        .then((datas) => {
            console.log(datas);
            this.setState({
                record: datas
            });
        })
        .catch((err) => console.error(err));
    }

    render() {

        if (this.state.record == null) {
            return (
            <h2>
                Chargement...
            </h2>
            );
        } else {
            return (
                <div>
                    <h2>{this.state.record.recordTitle}</h2>
                    <Element  
                    author={this.state.record.author}
                    editor={this.state.record.editor}
                    createdDate={this.state.record.createdDate}
                    />
                </div>
            );
        }
    }
}

// On parse l'url
const urlData = document.URL.split("?")[1];
if (urlData != null) {
    const record = urlData.split("=")[1];
    ReactDOM.render(<Record id={record} />, document.querySelector("#app"));
} else {
    ReactDOM.render(<Records />, document.querySelector("#app"));
}