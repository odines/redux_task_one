import {connect} from "react-redux";
import News from "../components/News";

const mapStateToProps = state => {
	return {
		data: null
	}
}

export default connect(mapStateToProps)(News);