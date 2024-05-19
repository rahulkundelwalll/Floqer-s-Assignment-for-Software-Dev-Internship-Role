import React, { useState, useEffect } from 'react';
import { Table, Modal } from 'antd';
// import 'antd/dist/antd.css';

const MainTable = ({ data }) => {
  const [tableData, setTableData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [jobTitleData, setJobTitleData] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const yearWiseData = {};

      // Group data by year and calculate total jobs and average salary
      data.forEach(item => {
        if (!yearWiseData[item.work_year]) {
          yearWiseData[item.work_year] = {
            totalJobs: 0,
            totalSalary: 0,
            count: 0,
            jobTitles: {},
          };
        }

        yearWiseData[item.work_year].totalJobs += 1;
        yearWiseData[item.work_year].totalSalary += parseInt(item.salary_in_usd);
        yearWiseData[item.work_year].count += 1;

        // Count job titles
        if (!yearWiseData[item.work_year].jobTitles[item.job_title]) {
          yearWiseData[item.work_year].jobTitles[item.job_title] = 1;
        } else {
          yearWiseData[item.work_year].jobTitles[item.job_title]++;
        }
      });

      // Calculate average salary
      const formattedData = Object.keys(yearWiseData).map(year => ({
        year,
        totalJobs: yearWiseData[year].totalJobs,
        averageSalary: yearWiseData[year].totalSalary / yearWiseData[year].count,
        jobTitles: yearWiseData[year].jobTitles,
      }));

      setTableData(formattedData);
    }
  }, [data]);

  const handleRowClick = year => {
    setSelectedYear(year);
    setModalVisible(true);
    setJobTitleData(tableData.find(item => item.year === year).jobTitles);
  };

  const columns = [
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
      sorter: (a, b) => a.year.localeCompare(b.year),
    },
    {
      title: 'Number of Jobs',
      dataIndex: 'totalJobs',
      key: 'totalJobs',
      sorter: (a, b) => a.totalJobs - b.totalJobs,
    },
    {
      title: 'Average Salary (USD)',
      dataIndex: 'averageSalary',
      key: 'averageSalary',
      sorter: (a, b) => a.averageSalary - b.averageSalary,
      render: salary => `$${salary.toFixed(2)}`,
    },
  ];

  const modalColumns = [
    {
      title: 'Job Title',
      dataIndex: 'jobTitle',
      key: 'jobTitle',
    },
    {
      title: 'Number of Jobs',
      dataIndex: 'count',
      key: 'count',
    },
  ];

  return (
    <div>
      <Table
        dataSource={tableData}
        columns={columns}
        pagination={false}
        rowKey="year"
        onRow={(record, rowIndex) => {
          return {
            onClick: event => handleRowClick(record.year),
          };
        }}
      />
      <Modal
        title={`Jobs in ${selectedYear}`}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Table dataSource={Object.keys(jobTitleData).map(title => ({ jobTitle: title, count: jobTitleData[title] }))} columns={modalColumns} pagination={false} />
      </Modal>
    </div>
  );
};

export default MainTable;
