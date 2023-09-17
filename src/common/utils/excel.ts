import * as xl from 'excel4node';
import { formatDate } from './datetime';

export type CreateExcelTemplateObject = {
  title: string;
  columns: Array<CreateExcelTemplateColumns>;
  workSheetName?: string;
};

export type CreateExcelTemplateColumns = {
  width: number;
  columnTitle: string;
};

export const createExcelTemplate = (payload: CreateExcelTemplateObject) => {
  const wb = new xl.Workbook();
  const workSheetName = payload.workSheetName || 'Wipon-pro-worksheet';
  const ws = wb.addWorksheet(workSheetName);
  const style = wb.createStyle({
    font: {
      color: '#000000',
      size: 12,
    },
    alignment: {
      wrapText: true,
      horizontal: 'center',
      vertical: 'center',
    },
  });

  const now = formatDate(new Date(), true);
  ws.cell(1, 1).string(`Данные актуальны на дату: ${now}`);
  ws.cell(2, 1).string(payload.title);

  payload.columns.forEach((el, idx) => {
    ws.column(idx + 1).setWidth(el.width);
    ws.cell(4, idx + 1)
      .string(el.columnTitle)
      .style(style);
  });

  return {
    dataFillingStartIdx: 5,
    wb,
    ws,
    style,
  };
};
