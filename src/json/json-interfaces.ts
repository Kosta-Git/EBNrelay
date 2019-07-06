export interface RootObject {
    Object: ObjectItem[];
}
export interface ObjectItem {
    type: string;
    id: string;
    DisplayId?: string;
    Class?: string;
    Enemy?: string;
    Texture?: Texture;
    MaxHitPoints?: string | MaxHitPoints;
    Defense?: string | Defense;
    Size?: string;
    Exp?: string;
    StasisImmune?: string;
    Group?: string;
    AnimatedTexture?: AnimatedTexture;
    HitSound?: string;
    DeathSound?: string;
    Projectile?: Projectile | ProjectileItem[];
    Flying?: string;
    Quest?: string;
    God?: string;
    StunImmune?: string;
    ParalyzeImmune?: string;
    EventChestBoss?: string;
    TrackLoot?: string;
    Friendly?: string;
    CanUseTexes?: string;
    NoMiniMap?: string;
    ShadowSize?: string;
    Effect?: Effect | string;
    AltTexture?: AltTexture | AltTextureItem[];
    ShadowColor?: string;
    Z?: string;
    Sound?: Sound | string | SoundItem[];
    Animation?: Animation | AnimationItem[];
    RandomTexture?: RandomTexture;
    MinSize?: string;
    MaxSize?: string;
    Invincible?: string;
    Item?: string;
    SlotType?: string;
    Description?: string;
    Consumable?: string;
    Soulbound?: string;
    Activate?: Activate | string | ActivateItem[];
    KeepDamageRecord?: string;
    Terrain?: string;
    SpawnProb?: string;
    OccupySquare?: string;
    EnemyOccupySquare?: string;
    Static?: string;
    DrawOnGround?: string;
    NoArticle?: string;
    Container?: string;
    CanPutNormalObjects?: string;
    SlotTypes?: string;
    ShowName?: string;
    CanPutSoulboundObjects?: string;
    Loot?: string;
    Mask?: Mask;
    Tex1?: string;
    BagType?: string;
    Tex2?: string;
    Level?: string;
    DazedImmune?: string;
    Encounter?: string;
    PerRealmMax?: string;
    _?: string;
    DontFaceAttacks?: string;
    Hero?: string;
    Cube?: string;
    Portrait?: Portrait;
    Rotation?: string;
    Top?: Top;
    FullOccupy?: string;
    BlocksSight?: string;
    feedPower?: string;
    Tier?: string;
    RateOfFire?: string;
    OldSound?: string;
    DropTradable?: string;
    FameBonus?: string;
    NumProjectiles?: string;
    ArcGap?: string;
    ActivateOnEquip?: ActivateOnEquip | ActivateOnEquipItem[];
    ConditionEffect?: ConditionEffect;
    Usable?: string;
    MpCost?: string;
    Potion?: string;
    Track?: string;
    Doses?: string;
    SuccessorId?: string;
    Cooldown?: string;
    ExtraTooltipData?: ExtraTooltipData;
    Timer?: string;
    XpBoost?: string;
    ScaleValue?: string;
    MpEndCost?: string;
    MultiPhase?: string;
    LTBoosted?: string;
    LDBoosted?: string;
    Backpack?: string;
    Treasure?: string;
    PetFood?: string;
    setType?: string;
    setName?: string;
    PetFormStone?: string;
    InvUse?: string;
    OnPlayerHitActivate?: OnPlayerHitActivate;
    MpCostPerSecond?: string;
    PetFamily?: string;
    Rarity?: string;
    BloodProb?: string;
    BloodColor?: string;
    IntergamePortal?: string;
    DungeonName?: string;
    AngleCorrection?: string;
    SizeStep?: string;
    Color?: string;
    Connects?: string;
    Model?: string;
    HealthBar?: string;
    LeachHealth?: string;
    Spawn?: Spawn;
    Oryx?: string;
    NexusPortal?: string;
    Price?: string;
    GuildItem?: string;
    GuildItemParam?: string;
    DrawUnder?: string;
    DontFaceMovement?: string;
    PetId?: string;
    PetSkin?: string;
    VaultItem?: string;
    Quantity?: string;
    Pet?: string;
    Family?: string;
    DefaultSkin?: string;
    FirstAbility?: string;
    BasicPet?: string;
    WhileMoving?: WhileMoving;
    NoHatchOrFuse?: string;
    PetProjectile?: string;
    PetBehavior?: string;
    BaseBehavior?: BaseBehavior;
    Parameters?: ParametersOne;
    PetAbility?: string;
    Player?: string;
    Equipment?: string;
    MaxMagicPoints?: MaxMagicPoints;
    Attack?: Attack;
    Speed?: Speed;
    Dexterity?: Dexterity;
    HpRegen?: HpRegen;
    MpRegen?: MpRegen;
    LevelIncrease?: LevelIncreaseItem[];
    UnlockLevel?: UnlockLevel | UnlockLevelItem[] | string;
    UnlockCost?: string;
    SpawnPoint?: string;
    LockedPortal?: string;
    Skin?: string;
    PlayerClassType?: string;
    UnlockSpecial?: string;
    NoSkinSelect?: string;
    ProtectFromGroundDamage?: string;
    ProtectFromSink?: string;
    BaseIndent?: string;
    TopIndent?: string;
    Height?: string;
    DotTexture?: DotTexture;
    ShortLineTexture?: ShortLineTexture;
    LTexture?: LTexture;
    LineTexture?: LineTexture;
    TTexture?: TTexture;
    CrossTexture?: CrossTexture;
    NoWallTextureRepeat?: string;
    PetYardType?: string;
    Fame?: string;
    RemoteTexture?: RemoteTexture;
}
interface Texture {
    File: string;
    Index: string;
}
interface AnimatedTexture {
    File: string;
    Index: string;
}
export interface Projectile {
    id?: string;
    ObjectId: string;
    Damage?: string;
    Speed: string;
    LifetimeMS?: string;
    ArmorPiercing?: string;
    MultiHit?: string;
    Size?: string;
    Amplitude?: string;
    Frequency?: string;
    ConditionEffect?: ConditionEffect | ConditionEffectItem[];
    Wavy?: string;
    ParticleTrail?: string | ParticleTrail;
    MinDamage?: string;
    MaxDamage?: string;
    Parametric?: string;
    PassesCover?: string;
    FaceDir?: string;
    Boomerang?: string;
    Magnitude?: string;
}
export interface ProjectileItem {
    id?: string;
    ObjectId: string;
    Speed: string;
    Damage: string;
    Size?: string;
    LifetimeMS?: string;
    ArmorPiercing?: string;
    MultiHit?: string;
    ConditionEffect?: ConditionEffect | ConditionEffectItem[];
    Amplitude?: string;
    Frequency?: string;
    FaceDir?: string;
    Boomerang?: string;
    PassesCover?: string;
    ParticleTrail?: string | ParticleTrail;
    Parametric?: string;
    Wavy?: string;
    Magnitude?: string;
}
interface ConditionEffect {
    _: string;
    duration?: string;
    target?: string;
    effect?: string;
}
interface Effect {
    _?: string;
    color?: string;
    rate?: string;
    life?: string;
    lifeVariance?: string;
    speed?: string;
    speedVariance?: string;
    size?: string;
    rise?: string;
    riseAcc?: string;
    riseVariance?: string;
    rangeX?: string;
    rangeY?: string;
    particle?: string;
    cooldown?: string;
    color2?: string;
    minRadius?: string;
    maxRadius?: string;
    amount?: string;
    Type?: Type;
    Probability?: Probability;
    Duration?: Duration;
    zOffset?: string;
    sizeVariance?: string;
}
interface AltTexture {
    id: string;
    Texture?: Texture;
    AnimatedTexture?: AnimatedTexture;
    Effect?: Effect;
}
interface Sound {
    _: string;
    id: string;
}
interface Animation {
    prob?: string;
    period: string;
    Frame: FrameItem[] | Frame;
    sync?: string;
}
interface FrameItem {
    time: string;
    Texture?: Texture;
    RemoteTexture?: RemoteTexture;
}
interface RandomTexture {
    Texture?: TextureItem[] | Texture;
    AnimatedTexture?: AnimatedTextureItem[];
    RemoteTexture?: RemoteTextureItem[];
}
interface TextureItem {
    File: string;
    Index: string;
}
interface AltTextureItem {
    id: string;
    Texture?: Texture;
    AnimatedTexture?: AnimatedTexture;
    Effect?: Effect;
    RemoteTexture?: RemoteTexture;
}
interface AnimatedTextureItem {
    File: string;
    Index: string;
}
interface Activate {
    _: string;
    id?: string;
    objectId?: string;
    stat?: string;
    amount?: string;
    range?: string;
    duration?: string;
    useWisMod?: string;
    effect?: string;
    radius?: string;
    impactDamage?: string;
    totalDamage?: string;
    throwTime?: string;
    heal?: string;
    wisDamageBase?: string;
    ignoreDef?: string;
    color?: string;
    condDuration?: string;
    decrDamage?: string;
    maxTargets?: string;
    onlyInArea?: string;
    dungeonName?: string;
    lockedName?: string;
    condEffect?: string;
    sensitivity?: string;
    wisPerTarget?: string;
    numShots?: string;
    gapAngle?: string;
    gapTiles?: string;
    offsetAngle?: string;
    arcGap?: string;
    maxDistance?: string;
    arcDegrees?: string;
    speed?: string;
    distance?: string;
    wisMin?: string;
    colorMissed?: string;
    slot?: string;
    target?: string;
    center?: string;
    healRange?: string;
    wisPerRad?: string;
    incrRad?: string;
    onlyIn?: string;
    starrequirement?: string;
    damage?: string;
    hideEffect?: string;
    cooldown?: string;
    skinType?: string;
    skin?: string;
    posOffset?: string;
    enablePetManaHealing?: string;
    targetId?: string;
    newId?: string;
    isUnlock?: string;
}
interface ConditionEffectItem {
    _: string;
    duration: string;
    target?: string;
}
interface Mask {
    File: string;
    Index: string;
}
interface AnimationItem {
    prob: string;
    period: string;
    Frame: FrameItem[] | Frame;
    periodJitter?: string;
}
interface Portrait {
    AnimatedTexture: AnimatedTexture;
    Texture?: Texture;
}
interface Top {
    Texture?: Texture;
    RandomTexture?: RandomTexture;
    Animation?: Animation;
}
interface ActivateOnEquip {
    _: string;
    stat: string;
    amount: string;
}
interface ActivateOnEquipItem {
    _: string;
    stat: string;
    amount: string;
}
interface ActivateItem {
    _: string;
    stat?: string;
    amount?: string;
    duration?: string;
    effect?: string;
    range?: string;
    useWisMod?: string;
    color?: string;
    target?: string;
    center?: string;
    visualEffect?: string;
    noStack?: string;
    maxDistance?: string;
    speed?: string;
    distance?: string;
    angleOffset?: string;
    checkExistingEffect?: string;
    objectId?: string;
    radius?: string;
    damage?: string;
    numShots?: string;
    gapAngle?: string;
    gapTiles?: string;
    offsetAngle?: string;
    totalDamage?: string;
    ignoreDef?: string;
    healRange?: string;
    impactDamage?: string;
    throwTime?: string;
    decrDamage?: string;
    wisDamageBase?: string;
    maxTargets?: string;
    wisPerTarget?: string;
    cooldown?: string;
    minDistance?: string;
    onlyIn?: string;
    skin?: string;
}
interface ExtraTooltipData {
    EffectInfo: EffectInfoItem[] | EffectInfo;
}
interface EffectInfoItem {
    name: string;
    description: string;
}
interface EffectInfo {
    name: string;
    description: string;
}
interface ParticleTrail {
    _?: string;
    intensity?: string;
    lifetimeMS?: string;
    color?: string;
}
interface OnPlayerHitActivate {
    _: string;
    proc: string;
    cooldown: string;
    objectId?: string;
    hpMinThreshold?: string;
    duration?: string;
    amount?: string;
}
interface Frame {
    time: string;
    RandomTexture?: RandomTexture;
    Texture?: Texture;
}
interface Spawn {
    Mean: string;
    StdDev: string;
    Min: string;
    Max: string;
}
interface WhileMoving {
    Z: string;
    Flying: string;
    ShadowSize?: string;
}
interface BaseBehavior {
    id: string;
}
interface ParametersOne {
    MaxHeal?: MaxHeal;
    Cooldown?: Cooldown;
    ProjectileId?: ProjectileId;
    DamageCurve?: DamageCurve;
    ThreatRange?: ThreatRange;
    Delay?: Delay;
    AimType?: AimType;
    Color?: Color;
    Damage?: Damage;
    DamageRange?: DamageRange;
    Effect?: Effect;
    Tiles?: Tiles;
    Frequency?: Frequency;
    Radius?: Radius;
    Duration?: Duration;
    MaxChargeTime?: MaxChargeTime;
    MaxDamage?: MaxDamage;
}
interface MaxHeal {
    min: string;
    max: string;
    curve: string;
}
interface Cooldown {
    min: string;
    max: string;
    curve: string;
}
interface ProjectileId {
    value: string;
}
interface DamageCurve {
    value: string;
}
interface ThreatRange {
    value: string;
    min?: string;
    max?: string;
    curve?: string;
}
interface Delay {
    min: string;
    max: string;
    curve: string;
}
interface AimType {
    value: string;
}
interface Color {
    value: string;
}
interface Damage {
    min: string;
    max: string;
    curve: string;
}
interface DamageRange {
    min: string;
    max: string;
    curve: string;
}
interface Type {
    value: string;
}
interface Probability {
    min: string;
    max: string;
    curve: string;
}
interface Duration {
    min: string;
    max: string;
    curve: string;
}
interface Tiles {
    min: string;
    max: string;
    curve: string;
}
interface Frequency {
    min: string;
    max: string;
    curve: string;
}
interface Radius {
    min: string;
    max: string;
    curve: string;
}
interface MaxChargeTime {
    min: string;
    max: string;
    curve: string;
}
interface MaxDamage {
    min: string;
    max: string;
    curve: string;
}
interface MaxHitPoints {
    _: string;
    max: string;
}
interface MaxMagicPoints {
    _: string;
    max: string;
}
interface Attack {
    _: string;
    max: string;
}
interface Defense {
    _: string;
    max: string;
}
interface Speed {
    _: string;
    max: string;
}
interface Dexterity {
    _: string;
    max: string;
}
interface HpRegen {
    _: string;
    max: string;
}
interface MpRegen {
    _: string;
    max: string;
}
interface LevelIncreaseItem {
    _: string;
    min: string;
    max: string;
}
interface UnlockLevel {
    _: string;
    level: string;
    type: string;
}
interface UnlockLevelItem {
    _: string;
    level: string;
    type: string;
}
interface DotTexture {
    File: string;
    Index: string;
}
interface ShortLineTexture {
    File: string;
    Index: string;
}
interface LTexture {
    File: string;
    Index: string;
}
interface LineTexture {
    File: string;
    Index: string;
}
interface TTexture {
    File: string;
    Index: string;
}
interface CrossTexture {
    File: string;
    Index: string;
}
interface RemoteTexture {
    Instance: string;
    Id: string;
    Right?: string;
}
interface RemoteTextureItem {
    Instance: string;
    Id: string;
    Right: string;
}
interface SoundItem {
    _: string;
    id: string;
}
