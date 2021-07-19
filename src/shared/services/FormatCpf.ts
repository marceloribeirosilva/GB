export default class FormatCpf {
    static RemoveDotsAndDash(cpf: string): string {        
      return cpf.replace(/\.|-/gm,'');
    }
  }