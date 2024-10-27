export interface IMapper<Entity, Dto> {
    toDto(entity: Entity): Dto;
}
