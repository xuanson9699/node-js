
import fs from "fs";
import XLSX from 'xlsx';

const templateDir = "./templates/";

const exportExcel = async (req, res) => {
  const templateFile = templateDir + "KhachHangChuaDuDieuKien.xlsx";
  const templateBuffer = fs.readFileSync(templateFile);

  // Parse mẫu Excel thành một workbook
  const workbook = XLSX.read(templateBuffer, { type: 'buffer' });

  // Tạo một worksheet
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  // Chuẩn bị dữ liệu người dùng (trong ví dụ này, dữ liệu user là một mảng objects)
  const userData = [
    { name: 'SonPx', email: 'Pxuansonit.com' },
    { name: 'Sơn Phạm', email: 'user2@example.com' },
    // Thêm dữ liệu người dùng khác ở đây
  ];

  userData.forEach((user, index) => {
    worksheet[`A${index + 4}`] = { t: 's', v: user.name };
    worksheet[`B${index + 4}`] = { t: 's', v: user.email };
  });

  // Tạo một buffer từ workbook chứa dữ liệu user
  // const excelBuffer = await wb.writeToBuffer();
  const updatedBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
  // Trả về file Excel dạng blob
  res.setHeader('Content-Type', 'application/vnd.openxmlformats');
  res.setHeader('Content-Disposition', 'attachment; filename=exported.xlsx');
  res.end(updatedBuffer, 'binary');
};

export default { exportExcel };
