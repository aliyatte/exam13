import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import FormElement from "../UI/Form/FormElement";
import Button from "@material-ui/core/Button";

class BookForm extends Component {
  state = {
    title: '',
    cover: '',
    price: '',
    description: null,
    author: '',
    category: '',
  };

  submitFormHandler = event => {
    event.preventDefault();

    const formData = new FormData();

    Object.keys(this.state).forEach(key => {
      let value = this.state[key];
      formData.append(key, value);
    });

    this.props.onSubmit(formData);
  };

  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  fileChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.files[0],
    })
  };

  render() {
    const categoriesOptions = this.props.categories.map(c => ({title: c.title, id: c._id}));
    const authorsOption = this.props.authors.map(author => ({name: author.name, id: author._id}));

    return (
      <form onSubmit={this.submitFormHandler}>
        <Grid container direction="column" spacing={2}>
          <Grid item xs>
            <FormElement
              type="select"
              propertyName="category" required
              title="Category"
              onChange={this.inputChangeHandler}
              options={categoriesOptions}
              value={this.state.category}
            />
          </Grid>
          <Grid item xs>
            <FormElement
              type="select"
              propertyName="author" required
              title="Author"
              onChange={this.inputChangeHandler}
              options={authorsOption}
              value={this.state.author}
            />
          </Grid>
          <Grid item xs>
            <FormElement
              type="text"
              propertyName="title" required
              title="Title"
              placeholder="Enter book title"
              onChange={this.inputChangeHandler}
              value={this.state.title}
            />
          </Grid>
          <Grid item xs>
            <FormElement
              type="text"
              propertyName="description" required
              title="Description"
              placeholder="Enter book description"
              onChange={this.inputChangeHandler}
              value={this.state.description}
              multiline={true}
              rows={5}
            />
          </Grid>
          <Grid item xs>
            <FormElement
              type="number" min={0}
              propertyName="price" required
              title="Price"
              placeholder="Enter book price"
              onChange={this.inputChangeHandler}
              value={this.state.price}
            />
          </Grid>
          <Grid item xs>
            <FormElement
              type="file"
              propertyName="cover"
              title="Cover"
              onChange={this.fileChangeHandler}
            />
          </Grid>
          <Grid item xs>
            <Button type="submit" color="primary" variant="contained">Save</Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default BookForm;