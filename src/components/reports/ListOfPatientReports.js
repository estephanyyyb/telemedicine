import React from 'react';
import PropTypes from 'prop-types';
// import styles from './Reports.css';
import DynamicTable from '../dynamic-table/DynamicTable';
import PageHeader from '../page-header/PageHeader';

const testData2 = [
	{ firstName: 'Don', lastName: 'Wasif', number: '999-999-9999', docter: 'Dr. Slater', email: 'wasif@email.com', report: 'Patient Report' },
	{ firstName: 'Dan', lastName: 'Ali', number: '111-111-1111', docter: 'Dr. Yohan',  email: 'ali@email.com', report: 'Patient Report' },
	{ firstName: 'John', lastName: 'Saad', number: '222-222-2222', docter: 'Dr. Jack',  email: 'saad@email.com', report: 'Patient Report'  },
	{ firstName: 'Bill', lastName: 'Bach', number: '333-333-3333', docter: 'Dr. Jeremy',  email: 'bach@email.com', report: 'Patient Report' },
	{ firstName: 'Don', lastName: 'Wasif', number: '999-999-9999', docter: 'Dr. Slater', email: 'wasif@email.com', report: 'Patient Report' },
	{ firstName: 'Dan', lastName: 'Ali', number: '111-111-1111', docter: 'Dr. Yohan',  email: 'ali@email.com', report: 'Patient Report' },
	{ firstName: 'John', lastName: 'Saad', number: '222-222-2222', docter: 'Dr. Jack',  email: 'saad@email.com', report: 'Patient Report'  },
	{ firstName: 'Bill', lastName: 'Bach', number: '333-333-3333', docter: 'Dr. Jeremy',  email: 'bach@email.com', report: 'Patient Report' },
	{ firstName: 'Don', lastName: 'Wasif', number: '999-999-9999', docter: 'Dr. Slater', email: 'wasif@email.com', report: 'Patient Report' },
	{ firstName: 'Dan', lastName: 'Ali', number: '111-111-1111', docter: 'Dr. Yohan',  email: 'ali@email.com', report: 'Patient Report' },
	{ firstName: 'John', lastName: 'Saad', number: '222-222-2222', docter: 'Dr. Jack',  email: 'saad@email.com', report: 'Patient Report'  },
	{ firstName: 'Bill', lastName: 'Bach', number: '333-333-3333', docter: 'Dr. Jeremy',  email: 'bach@email.com', report: 'Patient Report' },
	{ firstName: 'Don', lastName: 'Wasif', number: '999-999-9999', docter: 'Dr. Slater', email: 'wasif@email.com', report: 'Patient Report' },
	{ firstName: 'Dan', lastName: 'Ali', number: '111-111-1111', docter: 'Dr. Yohan',  email: 'ali@email.com', report: 'Patient Report' },
	{ firstName: 'John', lastName: 'Saad', number: '222-222-2222', docter: 'Dr. Jack',  email: 'saad@email.com', report: 'Patient Report'  },
	{ firstName: 'Bill', lastName: 'Bach', number: '333-333-3333', docter: 'Dr. Jeremy',  email: 'bach@email.com', report: 'Patient Report' },
	{ firstName: 'Don', lastName: 'Wasif', number: '999-999-9999', docter: 'Dr. Slater', email: 'wasif@email.com', report: 'Patient Report' },
	{ firstName: 'Dan', lastName: 'Ali', number: '111-111-1111', docter: 'Dr. Yohan',  email: 'ali@email.com', report: 'Patient Report' },
	{ firstName: 'John', lastName: 'Saad', number: '222-222-2222', docter: 'Dr. Jack',  email: 'saad@email.com', report: 'Patient Report'  },
	{ firstName: 'Bill', lastName: 'Bach', number: '333-333-3333', docter: 'Dr. Jeremy',  email: 'bach@email.com', report: 'Patient Report' },
	{ firstName: 'Don', lastName: 'Wasif', number: '999-999-9999', docter: 'Dr. Slater', email: 'wasif@email.com', report: 'Patient Report' },
	{ firstName: 'Dan', lastName: 'Ali', number: '111-111-1111', docter: 'Dr. Yohan',  email: 'ali@email.com', report: 'Patient Report' },
	{ firstName: 'John', lastName: 'Saad', number: '222-222-2222', docter: 'Dr. Jack',  email: 'saad@email.com', report: 'Patient Report'  },
	{ firstName: 'Bill', lastName: 'Bach', number: '333-333-3333', docter: 'Dr. Jeremy',  email: 'bach@email.com', report: 'Patient Report' },
	{ firstName: 'Don', lastName: 'Wasif', number: '999-999-9999', docter: 'Dr. Slater', email: 'wasif@email.com', report: 'Patient Report' },
	{ firstName: 'Dan', lastName: 'Ali', number: '111-111-1111', docter: 'Dr. Yohan',  email: 'ali@email.com', report: 'Patient Report' },
	{ firstName: 'John', lastName: 'Saad', number: '222-222-2222', docter: 'Dr. Jack',  email: 'saad@email.com', report: 'Patient Report'  },
	{ firstName: 'Bill', lastName: 'Bach', number: '333-333-3333', docter: 'Dr. Jeremy',  email: 'bach@email.com', report: 'Patient Report' },
	{ firstName: 'Don', lastName: 'Wasif', number: '999-999-9999', docter: 'Dr. Slater', email: 'wasif@email.com', report: 'Patient Report' },
	{ firstName: 'Dan', lastName: 'Ali', number: '111-111-1111', docter: 'Dr. Yohan',  email: 'ali@email.com', report: 'Patient Report' },
	{ firstName: 'John', lastName: 'Saad', number: '222-222-2222', docter: 'Dr. Jack',  email: 'saad@email.com', report: 'Patient Report'  },
	{ firstName: 'Bill', lastName: 'Bach', number: '333-333-3333', docter: 'Dr. Jeremy',  email: 'bach@email.com', report: 'Patient Report' },
	{ firstName: 'Don', lastName: 'Wasif', number: '999-999-9999', docter: 'Dr. Slater', email: 'wasif@email.com', report: 'Patient Report' },
	{ firstName: 'Dan', lastName: 'Ali', number: '111-111-1111', docter: 'Dr. Yohan',  email: 'ali@email.com', report: 'Patient Report' },
	{ firstName: 'John', lastName: 'Saad', number: '222-222-2222', docter: 'Dr. Jack',  email: 'saad@email.com', report: 'Patient Report'  },
	{ firstName: 'Bill', lastName: 'Bach', number: '333-333-3333', docter: 'Dr. Jeremy',  email: 'bach@email.com', report: 'Patient Report' },
	{ firstName: 'Don', lastName: 'Wasif', number: '999-999-9999', docter: 'Dr. Slater', email: 'wasif@email.com', report: 'Patient Report' },
	{ firstName: 'Dan', lastName: 'Ali', number: '111-111-1111', docter: 'Dr. Yohan',  email: 'ali@email.com', report: 'Patient Report' },
	{ firstName: 'John', lastName: 'Saad', number: '222-222-2222', docter: 'Dr. Jack',  email: 'saad@email.com', report: 'Patient Report'  },
	{ firstName: 'Bill', lastName: 'Bach', number: '333-333-3333', docter: 'Dr. Jeremy',  email: 'bach@email.com', report: 'Patient Report' },
	{ firstName: 'Don', lastName: 'Wasif', number: '999-999-9999', docter: 'Dr. Slater', email: 'wasif@email.com', report: 'Patient Report' },
	{ firstName: 'Dan', lastName: 'Ali', number: '111-111-1111', docter: 'Dr. Yohan',  email: 'ali@email.com', report: 'Patient Report' },
	{ firstName: 'John', lastName: 'Saad', number: '222-222-2222', docter: 'Dr. Jack',  email: 'saad@email.com', report: 'Patient Report'  },
	{ firstName: 'Bill', lastName: 'Bach', number: '333-333-3333', docter: 'Dr. Jeremy',  email: 'bach@email.com', report: 'Patient Report' },
	{ firstName: 'Don', lastName: 'Wasif', number: '999-999-9999', docter: 'Dr. Slater', email: 'wasif@email.com', report: 'Patient Report' },
	{ firstName: 'Dan', lastName: 'Ali', number: '111-111-1111', docter: 'Dr. Yohan',  email: 'ali@email.com', report: 'Patient Report' },
	{ firstName: 'John', lastName: 'Saad', number: '222-222-2222', docter: 'Dr. Jack',  email: 'saad@email.com', report: 'Patient Report'  },
	{ firstName: 'Bill', lastName: 'Bach', number: '333-333-3333', docter: 'Dr. Jeremy',  email: 'bach@email.com', report: 'Patient Report' },
	{ firstName: 'Don', lastName: 'Wasif', number: '999-999-9999', docter: 'Dr. Slater', email: 'wasif@email.com', report: 'Patient Report' },
	{ firstName: 'Dan', lastName: 'Ali', number: '111-111-1111', docter: 'Dr. Yohan',  email: 'ali@email.com', report: 'Patient Report' },
	{ firstName: 'John', lastName: 'Saad', number: '222-222-2222', docter: 'Dr. Jack',  email: 'saad@email.com', report: 'Patient Report'  },
	{ firstName: 'Bill', lastName: 'Bach', number: '333-333-3333', docter: 'Dr. Jeremy',  email: 'bach@email.com', report: 'Patient Report' },
	{ firstName: 'Don', lastName: 'Wasif', number: '999-999-9999', docter: 'Dr. Slater', email: 'wasif@email.com', report: 'Patient Report' },
	{ firstName: 'Dan', lastName: 'Ali', number: '111-111-1111', docter: 'Dr. Yohan',  email: 'ali@email.com', report: 'Patient Report' },
	{ firstName: 'John', lastName: 'Saad', number: '222-222-2222', docter: 'Dr. Jack',  email: 'saad@email.com', report: 'Patient Report'  },
	{ firstName: 'Bill', lastName: 'Bach', number: '333-333-3333', docter: 'Dr. Jeremy',  email: 'bach@email.com', report: 'Patient Report' }
];

function ListOfPatientReports (props) {
	  return (
		  	<div>
				<PageHeader currentUser={props.currentUser}></PageHeader>
				<DynamicTable sortFields={props.sortFields} tableTitle="Patient Reports" data={testData2}></DynamicTable>
			</div>
	);
}

ListOfPatientReports.propTypes = {};

ListOfPatientReports.defaultProps = {};

export default ListOfPatientReports;