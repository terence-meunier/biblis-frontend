function Record(props) {
    return (
        <ul>
            <li>Auteur : {props.author}</li>
            <li>Editeur : {props.editor}</li>
            <li>Date de parution : {props.createdDate}</li>
        </ul>
    )
}

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
                            <h2>{record.recordTitle}</h2>
                            <Record  
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

ReactDOM.render(<Records />, document.querySelector("#app"));