import React, {useContext} from "react";
const stateContext = React.createContext();



Table.TH = function TH({children, ...props}) {
  return (
    <th {...props}>
        {children}
    </th>
    );
};

Table.TR = function TR(props) {
  return <tr {...props} />;
};

Table.TD = function TD({children, ...props}) {
  return (
  <td {...props}>
      {children}
  </td>
  );
};
export default function Table({children, ...props}) {
    const rows = props.data.map((el, idx) => (
        <Table.TR key={idx}>
          {Object.values(el).map((el, idx) => (
            <Table.TD key={idx}>{el}</Table.TD>
          ))}
        </Table.TR>
      ));
      return (
          <stateContext.Provider>
        <table className='table table-striped' {...props}>
                <thead>
                    <Table.TR>
                    {Object.keys(props.data[0]).map((el, idx) => (
                        <Table.TH key={idx}>
                        <label>{el}</label>
                        </Table.TH>
                    ))}
                    </Table.TR>
                    </thead>
                <tbody>
                    {rows}
                    {children}
                </tbody>
        </table>
        </stateContext.Provider>
      );
    }