import {Component} from 'react'
import XLSX from 'xlsx'
import {Button, Icon} from 'antd'

class ExcelDownloader extends Component {
  handleExcelDownload = () => {
    const { data, columns } = this.props;
    const exportedData = data.map(item => {
      return Object.values(item)
    })

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(
      [columns.map(r => r.title)].concat(exportedData.map(r => r))
    );
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tabela Exportada");
    XLSX.writeFile(workbook, "TabelaExportada.xls", { compression: true });
  }

  render() {
    return (
      <Button type="primary" onClick={this.handleExcelDownload}>
        <Icon type="plus" /> Export Excel
      </Button>
    )
  }
}

export default ExcelDownloader