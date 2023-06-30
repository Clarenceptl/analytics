//#region DTO
export * from './dto/user.dto';
export interface ApiDTO {
  success: boolean;
  data: any;
}
//#endregion

//#region ViewModels
export * from './viewModel/login.model';
export * from './viewModel/user.model';
//#endregion
