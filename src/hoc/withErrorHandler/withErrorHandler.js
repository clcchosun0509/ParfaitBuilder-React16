import React, {Fragment, Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => { //글로벌하게 에러를 제어하기 위한 핸들러
    return class extends Component {
        state = {
            error: null
        }
        
        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => { //요청 할 때에는 에러를 null로 유지
                this.setState({error: null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => { //응답을 받을 때 에러가 있다면 저장
                this.setState({error: error});
            });
        }
        
        //메모리 누수를 방지하기 위한 함수
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
        
        errorConfirmedHandler = () => { //modalClosed에 등록함으로써 백드롭 부분을 누르면 error:null로 모달창이 닫힌다.
            this.setState({error: null});
        }
        
        render() {
               return (
                <Fragment>
                    <Modal 
                    show={this.state.error}
                    modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />    
                </Fragment>
            ); 
        }
    }
};

export default withErrorHandler;