import {connect} from "react-redux";
import News from "../components/News";
import {fetchNews} from "../actions/NewsActions";

const mapStateToProps = state => {
	return {
		news: state.news
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchNews: () => dispatch(fetchNews())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(News);