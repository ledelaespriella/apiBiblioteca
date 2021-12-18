import React, { Component } from 'react';


class App extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            books: []
        };
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    login(e) {
        fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }

        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));
        e.preventDefault();
    }

    fetchBooks() {
        fetch('/api/book')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    books: data.results
                });
                console.log(this.state.books);
            })
    }

    componentDidMount() {
        this.fetchBooks();
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    }


    render() {
        return (
            <>
                <div className="row">
                    {/* Navegacion */}
                    <div className="col-sm-12 mb-3">
                        <nav className="navbar navbar-expand-lg navbar-light fixed-top shadow-sm m-3" id="mainNav">
                            <div className="container px-5">
                                <a className="navbar-brand fw-bold" href="/">Biblioteca</a>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                                    Menu
                        <i className="bi-list"></i>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarResponsive">
                                    <ul className="navbar-nav ms-auto me-4 my-3 my-lg-0">
                                        <li className="nav-item"><a className="nav-link me-lg-3" href="#features">Features</a></li>
                                        <li className="nav-item"><a className="nav-link me-lg-3" href="#download">Download</a></li>
                                        <li className="nav-item"><a href="/api" className="nav-link me-lg-3" >Api</a></li>
                                    </ul>
                                    <button className="btn btn-primary rounded-pill px-3 mb-2 mb-lg-0" data-bs-toggle="modal" data-bs-target="#feedbackModal">
                                        <span className="d-flex align-items-center">
                                            <i className="bi-chat-text-fill me-2"></i>
                                            <span className="small">Login</span>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    {/* Usuarios */}
                    <div className="col-sm-12 m-4">
                        <table className="table table-responsive table-bordered">
                            <thead>
                                <tr>
                                    <th className="col" scope="col">titulo</th>
                                    <th className="col" scope="col">Descripcion</th>
                                    <th className="col" scope="col">No paginas</th>
                                    <th className="col" scope="col">capitulos</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.books.map(book => {
                                        return (
                                            <tr key={book._id}>
                                                <th scope="row">{book.titulo}</th>
                                                <td>{book.descripcion}</td>
                                                <td>{book.npaginas}</td>
                                                <td>{book.capitulos}</td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                    </div>

                </div>
                {/* <!-- Feedback Modal--> */}
                <div class="modal fade" id="feedbackModal" tabindex="-1" aria-labelledby="feedbackModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header bg-gradient-primary-to-secondary p-4">
                                <h5 class="modal-title font-alt text-black" id="feedbackModalLabel">Login</h5>
                                <button class="btn-close btn-close-black" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body border-0 p-4">
                                {/* <!-- * * * * * * * * * * * * * * *-->
                            <!-- * * SB Forms Contact Form * *-->
                            <!-- * * * * * * * * * * * * * * *-->
                            <!-- This form is pre-integrated with SB Forms.-->
                            <!-- To make this form functional, sign up at-->
                            <!-- https://startbootstrap.com/solution/contact-forms-->
                            <!-- to get an API token!--> */}
                                <form onSubmit={this.login} id="contactForm" data-sb-form-api-token="API_TOKEN">
                                    {/* <!-- Name input--> */}
                                    <div class="form-floating mb-3">
                                        <input name="name" onChange={this.handleChange} class="form-control" id="name" type="text" placeholder="Enter your name..." data-sb-validations="required" />
                                        <label for="name">Nombre</label>
                                        <div class="invalid-feedback" data-sb-feedback="name:required">A name is required.</div>
                                    </div>
                                    {/* <!-- Email address input--> */}
                                    <div class="form-floating mb-3">
                                        <input name="email" onChange={this.handleChange} class="form-control" id="email" type="email" placeholder="name@example.com" data-sb-validations="required,email" />
                                        <label for="email">Correo</label>
                                        <div class="invalid-feedback" data-sb-feedback="email:required">An email is required.</div>
                                        <div class="invalid-feedback" data-sb-feedback="email:email">Email is not valid.</div>
                                    </div>
                                    {/* <!-- Phone number input--> */}
                                    <div class="form-floating mb-3">
                                        <input name="password" onChange={this.handleChange} class="form-control" id="phone" type="password" placeholder="(123) 456-7890" data-sb-validations="required" />
                                        <label for="phone">Contraseña</label>
                                        <div class="invalid-feedback" data-sb-feedback="phone:required">A phone number is required.</div>
                                    </div>
                                    {/* <!-- Submit success message-->
                                <!---->
                                <!-- This is what your users will see when the form-->
                                <!-- has successfully submitted--> */}
                                    <div class="d-none" id="submitSuccessMessage">
                                        <div class="text-center mb-3">
                                            <div class="fw-bolder">Form submission successful!</div>
                                        To activate this form, sign up at
                                        <br />
                                            <a href="https://startbootstrap.com/solution/contact-forms">https://startbootstrap.com/solution/contact-forms</a>
                                        </div>
                                    </div>
                                    {/* <!-- Submit error message-->
                                <!---->
                                <!-- This is what your users will see when there is-->
                                <!-- an error submitting the form--> */}
                                    <div class="d-none" id="submitErrorMessage"><div class="text-center text-danger mb-3">Error sending message!</div></div>
                                    {/* <!-- Submit Button--> */}
                                    <div class="d-grid"><button class="btn btn-primary rounded-pill btn-lg" id="submitButton" type="submit">Ingresar</button></div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </>

        )

    }


}

export default App;